import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { EditGenreDto } from "./dto/editGenre.dto";

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.genre.findMany();
  }

  findById(genreId: number) {
    return this.prismaService.genre.findUnique({
      where: { id: genreId },
    });
  }

  edit(genreId: number, input: EditGenreDto) {
    return this.prismaService.genre.update({
      where: { id: genreId },
      data: input,
    });
  }
}
