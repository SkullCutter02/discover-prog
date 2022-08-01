import { Injectable, Logger } from "@nestjs/common";
import Crawler from "crawler";
import { AlbumType } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

import { ArtistService } from "../artist/artist.service";
import { AlbumService } from "../album/album.service";

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly configService: ConfigService
  ) {}

  async scrapeArtists() {
    const latestArtist = await this.artistService.findBiggestId();

    const tasks = [];

    for (
      let i = latestArtist ? latestArtist.numericalId + 1 : 1;
      i < this.configService.get<number>("MAX_SCRAPE_ARTIST_ID");
      i++
    ) {
      tasks.push({ uri: `https://www.progarchives.com/artist.asp?id=${i}`, currentId: i });
    }

    const start = Date.now();

    const artistCrawler = new Crawler({
      maxConnections: 10,
      retries: 2,
      callback: async (err, res, done) => {
        if (err) {
          this.logger.error(err);
        } else {
          const $ = res.$;
          const currentId: number = res.options.currentId;

          const error = $("font").first().text();

          if (error && error === "error '80020009'") {
            this.logger.warn(`The artist with ID ${currentId} doesn't exist`);
          } else {
            const name = $("#main div > strong:first-child").first().text().split(" biography")[0];
            const biography = $("#moreBio").text()
              ? $("#moreBio").find("br").replaceWith("\n").end().text() // if an artist's bio is long enough
              : $("#main > div > div > div:nth-child(3)").first().find("br").replaceWith("\n").end().text(); // if an artist's bio is short
            const country = $("#main > div > h2").first().text().split(" • ")[1];
            const imageUrl = $("#main > div > div > div > img").first().attr("src");

            try {
              await this.artistService.create({
                numericalId: currentId,
                name,
                biography,
                imageUrl,
                country,
              });
              this.logger.log(`Artist with ID ${currentId} has been inserted into the database`);
            } catch (err) {
              this.logger.error(err);
            }
          }
        }

        done();
      },
    });

    artistCrawler.queue(tasks);

    artistCrawler.on("drain", async () => {
      const end = Date.now();
      this.logger.log(`Finished scraping all artists' information in ${(end - start) / 1000}s`);

      await this.scrapeAlbums();
    });
  }

  async scrapeAlbums() {
    const latestAlbum = await this.albumService.findBiggestId();

    const tasks = [];

    for (
      let i = latestAlbum ? latestAlbum.numericalId + 1 : 4;
      i < this.configService.get<number>("MAX_SCRAPE_ALBUM_ID");
      i++
    ) {
      tasks.push({ uri: `https://www.progarchives.com/album.asp?id=${i}`, currentId: i });
    }

    const start = Date.now();

    const albumCrawler = new Crawler({
      maxConnections: 10,
      retries: 2,
      callback: async (err, res, done) => {
        if (err) {
          this.logger.error(err);
        } else {
          const $ = res.$;
          const currentId = res.options.currentId;

          const head = $("head").html(); // when the album doesn't exist, the head is empty

          if (!head) {
            this.logger.warn(`The album with ID ${currentId} doesn't exist`);
          } else {
            const albumType = $("td > strong").first().text().split(", ")[0];

            // not including singles and compilations
            if (albumType === "Studio Album" || albumType === "Live") {
              const artistElement = $("h2 > a").first();

              const name =
                $("#reviews + h2")
                  .first()
                  .text()
                  .split(" ratings")[0]
                  .split(artistElement.text().toUpperCase() + " ")[1] ??
                $("#reviews + h2") // when the website converts special characters in the artist's name
                  .first()
                  .text()
                  .split(" ratings")[0]
                  .split(
                    artistElement
                      .text()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toUpperCase() + " "
                  )[1];
              const releaseYear = parseInt($("td > strong").first().text().split("released in ")[1]);
              const trackListing = $("td > p:nth-child(5)").first().find("br").replaceWith("\n").end().text();
              const musicians = $("td > p:nth-child(7)").first().find("br").replaceWith("\n").end().text();
              const imageUrl = $("td > img:first-child").first().attr("src");
              const artistId = parseInt(artistElement.attr("href").split("?id=")[1]);

              try {
                await this.albumService.create({
                  numericalId: currentId,
                  name,
                  releaseYear,
                  trackListing,
                  musicians,
                  imageUrl,
                  albumType: albumType === "Studio Album" ? AlbumType.STUDIO : AlbumType.LIVE,
                  artist: { connect: { numericalId: artistId } },
                });
                this.logger.log(`Album with ID ${currentId} has been inserted into the database`);
              } catch (err) {
                this.logger.error(err);
              }
            }
          }
        }

        done();
      },
    });

    albumCrawler.queue(tasks);

    albumCrawler.on("drain", () => {
      const end = Date.now();
      this.logger.log(`Finished scraping all albums' information in ${(end - start) / 1000}s`);
    });
  }
}
