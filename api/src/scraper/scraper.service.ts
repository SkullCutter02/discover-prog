import { Injectable } from "@nestjs/common";
import Crawler from "crawler";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ScraperService {
  constructor(private readonly prisma: PrismaService) {}

  scrapeArtists() {
    let currentId = 1;
    let errorCount = 0; // if errorCount > 4, that means there have been 5 consecutive nonexistent artists, and therefore stop the process of scraping

    const artistCrawler = new Crawler({
      maxConnections: 10,
      callback: async (err, res, done) => {
        if (err) {
          console.log(err);
          done();
        } else {
          const $ = res.$;

          const error = $("font").first().text();

          if (error && error === "error '80020009'") {
            console.log(`The artist with ID ${currentId} doesn't exist`);
            errorCount++;
          } else {
            errorCount = 0;

            const name = $("h1").first().text();
            const biography = $("#moreBio").html()
              ? // TODO: remove all link tags from moreBio
                $("#moreBio").html() // if an artist's bio is long enough
              : // TODO: remove last div that contains the ad from normal bio
                $("#main > div > div > div:nth-child(3)").first().html(); // if an artist's bio is short
            const country = $("#main > div > h2").first().text().split(" • ")[1];
            const imageUrl = $("#main > div > div > div > img").first().attr("src");

            await this.prisma.artist.create({
              data: {
                numericalId: currentId,
                name,
                biography,
                imageUrl,
                country,
              },
            });
            console.log(`Artist with ID ${currentId} has been inserted into the database`);
          }

          if (currentId <= 30 && errorCount < 5) {
            currentId++;
            artistCrawler.queue(`https://www.progarchives.com/artist.asp?id=${currentId}`);
          }

          done();
        }
      },
    });

    artistCrawler.queue(`https://www.progarchives.com/artist.asp?id=${currentId}`);
  }
}
