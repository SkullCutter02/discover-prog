import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/createReview.dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ albumId, ...data }: CreateReviewDto, userId: string) {
    return this.prismaService.review.create({
      data: {
        ...data,
        album: {
          connect: {
            id: albumId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
