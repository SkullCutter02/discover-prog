import { IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateReviewDto {
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  body?: string;

  @IsUUID(4)
  albumId: string;
}
