import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  findById(artistId: string, include?: Prisma.ArtistInclude) {
    return this.prisma.artist.findFirst({
      where: { id: artistId },
      include,
    });
  }

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
