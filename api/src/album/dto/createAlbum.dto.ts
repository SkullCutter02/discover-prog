import { IsNumber, IsString, MaxLength, Min, Max, IsEnum, IsUUID } from "class-validator";
import { AlbumType } from "@prisma/client";

export class CreateAlbumDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(1900)
  @Max(10000)
  releaseYear: number;

  @IsString()
  trackListing: string;

  @IsString()
  musicians: string;

  @IsEnum(AlbumType)
  albumType: AlbumType;

  @IsString()
  imageUrl: string;

  @IsUUID()
  artistId: string;
}
