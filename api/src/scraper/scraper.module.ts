import { Module } from "@nestjs/common";

import { ScraperService } from "./scraper.service";
import { ArtistModule } from "../artist/artist.module";

@Module({
  imports: [ArtistModule],
  providers: [ScraperService],
})
export class ScraperModule {}
