import { PartialType } from "@nestjs/mapped-types";

import { CreateArtistDto } from "./createArtist.dto";

export class EditArtistDto extends PartialType(CreateArtistDto) {}
