import { Injectable } from "@nestjs/common";
import { AlbumType, Prisma } from "@prisma/client";

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

  async findRanking(albumId: string) {
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
      SELECT albums_with_ratings.*, 
        a.name AS "artistName", 
        g.name AS "genreName", 
        dense_rank() OVER (ORDER BY qwr DESC)::int AS rank 
      FROM 
        (SELECT albums.*, (sum(r.rating * 
          (SELECT count(*) FROM reviews WHERE reviews."albumId" = albums.id)) / 
          (SELECT count(*) FROM reviews))::decimal(8, 2)::float AS qwr,
          avg(r.rating)::decimal(8, 2)::float AS "averageRating",
          count(r)::int AS "numOfReviews"
        FROM albums  
        INNER JOIN reviews r on albums.id = r."albumId"
        GROUP BY albums.id) albums_with_ratings 
      INNER JOIN artists a ON albums_with_ratings."artistId" = a.id
      INNER JOIN genres g ON albums_with_ratings."genreId" = g.id                                                                     
      ORDER BY rank      
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `;
  }

  async findRating(albumId: string) {
    const stats = await this.prisma.review.aggregate({
      where: { albumId },
      _avg: {
        rating: true,
      },
      _count: true,
    });

    return {
      avgRating: Math.round((stats._avg.rating + Number.EPSILON) * 100) / 100, // accurately round to 2 digits
      numOfReviews: stats._count,
    };
  }

  findArtistAlbums(artistId: string, albumType: AlbumType) {
    return this.prisma.$queryRaw`
      SELECT albums.*, 
        cast(avg(r.rating) AS decimal(8, 2))::float AS "avgRating",
        count(r)::int AS "numOfReviews"
      FROM albums
      LEFT JOIN reviews r on albums.id = r."albumId"         
      WHERE "artistId" = ${artistId} AND "albumType"::text = ${albumType.toString()}
      GROUP BY albums.id, "releaseYear"
      ORDER BY "releaseYear"
    `;
  }

  findMostPopular({ limit, page }: OffsetPaginateDto, include: Prisma.AlbumInclude) {
    return this.prisma.album.findMany({
      orderBy: { popularity: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include,
    });
  }

  async updatePopularity(albumId: string) {
    const album = await this.findById(albumId);

    const currentEpochTime = Math.floor(Date.now() / 1000);
    const newPopularity = Math.floor((album.popularity + currentEpochTime) / 2);

    return this.prisma.album.update({
      where: { id: albumId },
      data: { popularity: newPopularity },
    });
  }
}
