import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AlbumModule } from "../album/album.module";

@Module({
  imports: [PrismaModule, AlbumModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
