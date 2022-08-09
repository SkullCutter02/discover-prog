import { IsString, MaxLength } from "class-validator";

export class CreateArtistDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  biography: string;

  @IsString()
  country: string;

  @IsString()
  imageUrl: string;
}
