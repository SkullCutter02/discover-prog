import { IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class OffsetPaginateDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
