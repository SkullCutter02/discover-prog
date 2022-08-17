import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { EditAlbumDto } from "./dto/editAlbum.dto";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  findById(albumId: string, include?: Prisma.AlbumInclude) {
    return this.prisma.album.findFirst({
      where: { id: albumId },
      include,
    });
  }

  findBiggestId() {
    return this.prisma.album.findFirst({
      select: { numericalId: true },
      orderBy: { numericalId: "desc" },
    });
  }

  create(input: Prisma.AlbumCreateInput) {
    return this.prisma.album.create({
      data: input,
    });
  }

  edit(albumId: string, input: EditAlbumDto) {
    return this.prisma.album.update({
      where: { id: albumId },
      data: input,
    });
  }

  findHighestRated({ limit, page }: OffsetPaginateDto) {
    return this.prisma.$queryRaw`
      SELECT albums.*, cast(sum(r.rating * 
        (SELECT count(*) FROM reviews WHERE reviews."albumId" = albums.id)) / 
        (SELECT count(*) FROM reviews) AS decimal(8, 2)) AS qwr 
      FROM albums 
      INNER JOIN reviews r on albums.id = r."albumId" 
      GROUP BY albums.id
      ORDER BY qwr DESC
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `;
  }
}
