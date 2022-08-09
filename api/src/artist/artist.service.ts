import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { EditAlbumDto } from "../album/dto/editAlbum.dto";

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

  edit(artistId: string, input: EditAlbumDto) {
    return this.prisma.artist.update({
      where: { id: artistId },
      data: input,
    });
  }
}
