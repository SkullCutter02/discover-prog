import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/createReview.dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  findById(reviewId: string, include?: Prisma.ReviewInclude) {
    return this.prismaService.review.findUnique({
      where: { id: reviewId },
      include,
    });
  }

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
