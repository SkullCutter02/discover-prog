import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../decorators/getUser.decorator";
import { CreateReviewDto } from "./dto/createReview.dto";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@GetUser() user: User, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto, user.id);
  }
}
