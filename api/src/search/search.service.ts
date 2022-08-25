import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  searchWithQuery(query: string, { page, limit }: OffsetPaginateDto) {
    const ilike = `%${query}%`;

    return this.prisma.$queryRaw`
      SELECT *, (
        CASE 
          WHEN type = 'artist' THEN (unaccent(name) <-> ${query}) * 1000
          WHEN type = 'album' THEN
            CASE
              WHEN review_count <> 0 IS FALSE THEN ((unaccent(name) <-> ${query})) * 1000
              WHEN review_count <> 0 IS TRUE THEN ((unaccent(name) <-> ${query})) * 1000 - log(review_count)  
            END
        END
      ) AS rank
      FROM
        (SELECT 'artist' AS type, artists.* FROM artists) artists
          NATURAL FULL JOIN
        (SELECT 'album' AS type, albums.*, a.name AS artist_name, count(r)::int AS review_count FROM albums
          INNER JOIN artists a on albums."artistId" = a.id
          LEFT JOIN reviews r on albums.id = r."albumId"
          GROUP BY albums.id, a.name) albums
      WHERE unaccent(name) ILIKE ${ilike} 
       OR (unaccent(name) <-> ${query}) < 0.7
      ORDER BY rank, "releaseYear" 
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `;
  }
}
