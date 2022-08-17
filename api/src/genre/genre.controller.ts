import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

import { GenreService } from "./genre.service";

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
}
