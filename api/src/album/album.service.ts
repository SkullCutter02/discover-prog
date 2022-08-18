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

  async findRating(albumId: string) {
    const album = await this.findById(albumId);

    const globalRanking = await this.prisma.$queryRaw<[{ rank: number }]>`
      WITH albums_with_rank AS (
        SELECT id, dense_rank() OVER (ORDER BY qwr DESC)::int AS rank FROM
          (SELECT albums.id, (sum(r.rating * 
            (SELECT count(*) FROM reviews WHERE reviews."albumId" = albums.id)) / 
            (SELECT count(*) FROM reviews))::decimal(8, 2)::float AS qwr
        FROM albums  
        INNER JOIN reviews r on albums.id = r."albumId"
        GROUP BY albums.id) albums_with_ratings
      )
      SELECT rank FROM albums_with_rank 
      WHERE id = ${albumId}
      LIMIT 1
    `;

    const genreRanking = await this.prisma.$queryRaw<[{ rank: number }]>`
      WITH albums_with_rank AS (
        SELECT id, dense_rank() OVER (ORDER BY qwr DESC)::int AS rank FROM
          (SELECT albums.id, (sum(r.rating * 
            (SELECT count(*) FROM reviews WHERE reviews."albumId" = albums.id)) / 
            (SELECT count(*) FROM reviews))::decimal(8, 2)::float AS qwr
        FROM albums    
        INNER JOIN reviews r on albums.id = r."albumId"
        WHERE "genreId" = ${album.genreId}  
        GROUP BY albums.id) albums_with_ratings
      )
      SELECT rank FROM albums_with_rank
      WHERE id = ${albumId}
      LIMIT 1
    `;

    return { globalRanking: globalRanking[0].rank, genreRanking: genreRanking[0].rank };
  }

  findHighestRated({ limit, page }: OffsetPaginateDto) {
    return this.prisma.$queryRaw`
      SELECT *, dense_rank() OVER (ORDER BY qwr DESC)::int AS rank FROM
        (SELECT albums.*, (sum(r.rating * 
          (SELECT count(*) FROM reviews WHERE reviews."albumId" = albums.id)) / 
          (SELECT count(*) FROM reviews))::decimal(8, 2)::float AS qwr,
          avg(r.rating)::decimal(8, 2)::float AS "averageRating",
          count(r)::int AS "numOfReviews"
        FROM albums  
        INNER JOIN reviews r on albums.id = r."albumId"
        GROUP BY albums.id) albums_with_ratings 
      ORDER BY rank      
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `;
  }
}
