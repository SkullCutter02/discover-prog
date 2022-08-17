import { PartialType } from "@nestjs/mapped-types";

import { CreateGenreDto } from "./createGenre.dto";

export class EditGenreDto extends PartialType(CreateGenreDto) {}
