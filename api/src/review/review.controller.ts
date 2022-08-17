import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../decorators/getUser.decorator";
import { CreateReviewDto } from "./dto/createReview.dto";
import { ReviewService } from "./review.service";
import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getReviews(
    @GetUser() user: User,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.ReviewInclude,
    @Query() offsetPaginateDto: OffsetPaginateDto
  ) {
    return this.reviewService.findByUser(user.id, offsetPaginateDto, include);
  }

  @Get("/:id")
  getReview(
    @Param("id", ParseUUIDPipe) reviewId: string,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.ReviewInclude
  ) {
    return this.reviewService.findById(reviewId, include);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@GetUser() user: User, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto, user.id);
  }
}
