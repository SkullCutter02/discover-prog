import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/createReview.dto";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUser(userId: string, { limit, page }: OffsetPaginateDto, include?: Prisma.ReviewInclude) {
    const [totalReviewCount, reviews] = await this.prismaService.$transaction([
      this.prismaService.review.count({
        where: { userId },
      }),
      this.prismaService.review.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        include,
      }),
    ]);

    return { data: reviews, hasMore: page * limit < totalReviewCount };
  }

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
