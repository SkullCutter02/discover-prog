import { Injectable } from "@nestjs/common";
import Crawler from "crawler";

@Injectable()
export class ScraperService {
  artists: string[] = [];

  scrapeArtists() {
    let currentId = 1;

    const artistCrawler = new Crawler({
      maxConnections: 10,
      callback: (err, res, done) => {
        if (err) {
          console.log(err);
          done();
        } else {
          const $ = res.$;

          const error = $("font").first().text();

          if (error && error === "error '80020009'") {
            console.log(`The artist with ID ${currentId} doesn't exist`);
          } else {
            const artistName = $("h1").text();
            this.artists.push(artistName);
            console.log(this.artists);
          }

          if (currentId <= 20) {
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
