import { Module } from "@nestjs/common";

import { ArtistService } from "./artist.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
