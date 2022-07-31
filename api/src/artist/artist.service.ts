import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  findBiggestId() {
    return this.prisma.artist.findFirst({
      select: { numericalId: true },
      orderBy: { numericalId: "desc" },
    });
  }

  create(input: Prisma.ArtistCreateInput) {
    return this.prisma.artist.create({
      data: input,
    });
  }
}
