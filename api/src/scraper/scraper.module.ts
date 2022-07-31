import { Module } from "@nestjs/common";

import { ScraperService } from "./scraper.service";
import { ArtistModule } from "../artist/artist.module";
import { AlbumModule } from "../album/album.module";

@Module({
  imports: [ArtistModule, AlbumModule],
  providers: [ScraperService],
})
export class ScraperModule {}
