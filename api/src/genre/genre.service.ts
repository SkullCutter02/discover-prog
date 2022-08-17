import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.genre.findMany();
  }
}
