import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";

import { GenreService } from "./genre.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { EditGenreDto } from "./dto/editGenre.dto";

@Controller("genre")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getGenres() {
    return this.genreService.findAll();
  }

  @Get("/:id")
  getGenre(@Param("id", ParseIntPipe) genreId: number) {
    return this.genreService.findById(genreId);
  }

  @Patch("/:id")
  @Roles(Role.EDITOR, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  editGenre(@Param("id", ParseIntPipe) genreId: number, @Body() editGenreDto: EditGenreDto) {
    return this.genreService.edit(genreId, editGenreDto);
  }
}
