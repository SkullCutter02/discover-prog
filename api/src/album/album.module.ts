import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
