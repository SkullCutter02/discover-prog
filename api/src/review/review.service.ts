import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/createReview.dto";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";
import { EditReviewDto } from "./dto/editReview.dto";
import { AlbumService } from "../album/album.service";

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService, private readonly albumService: AlbumService) {}

  async findByUser(userId: string, { limit, page }: OffsetPaginateDto, include?: Prisma.ReviewInclude) {
    const [totalReviewCount, reviews] = await this.prisma.$transaction([
      this.prisma.review.count({
        where: { userId },
      }),
      this.prisma.review.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        include,
      }),
    ]);

    return { data: reviews, hasMore: page * limit < totalReviewCount };
  }

  findById(reviewId: string, include?: Prisma.ReviewInclude) {
    return this.prisma.review.findUnique({
      where: { id: reviewId },
      include,
    });
  }

  async create({ albumId, ...data }: CreateReviewDto, userId: string) {
    const count = await this.prisma.review.count({
      where: { albumId, userId },
    });

    if (count >= 1) throw new ConflictException("User has already created a review for this album");

    const review = await this.prisma.review.create({
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

    await this.albumService.updatePopularity(albumId);

    return review;
  }

  edit(reviewId: string, data: EditReviewDto) {
    return this.prisma.review.update({
      where: { id: reviewId },
      data,
    });
  }

  delete(reviewId: string) {
    return this.prisma.review.delete({
      where: { id: reviewId },
    });
  }

  findLatest({ limit, page }: OffsetPaginateDto, include: Prisma.ReviewInclude) {
    return this.prisma.review.findMany({
      where: { NOT: { body: null } },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
      include,
    });
  }
}
