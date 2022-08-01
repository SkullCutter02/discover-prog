import { Module } from "@nestjs/common";

import { ArtistService } from "./artist.service";
import { PrismaModule } from "../prisma/prisma.module";
import { ArtistController } from './artist.controller';

@Module({
  imports: [PrismaModule],
  providers: [ArtistService],
  exports: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
