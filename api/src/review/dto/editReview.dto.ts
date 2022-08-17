import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./createReview.dto";

export class EditReviewDto extends PartialType(OmitType(CreateReviewDto, ["albumId"])) {}
