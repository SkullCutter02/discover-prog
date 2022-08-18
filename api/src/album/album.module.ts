import { Module } from "@nestjs/common";

import { AlbumService } from "./album.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AlbumController } from "./album.controller";

@Module({
  imports: [PrismaModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
