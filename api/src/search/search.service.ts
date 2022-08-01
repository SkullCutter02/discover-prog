import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  searchWithQuery(query: string) {
    return this.prisma.$queryRaw`
      SELECT *, (
          CASE
              WHEN type = 'artist' THEN (name <-> ${query})
              WHEN type = 'album' THEN
                  CASE
                      WHEN artist_name <-> ${query} < 0.2 THEN (artist_name <-> ${query}) + 0.01
                      WHEN artist_name <-> ${query} > 0.2 THEN (name <-> ${query}) + 0.05
                  END
          END
      ) AS similarity
      FROM
          (SELECT 'artist' AS type, artists.* FROM artists) artists
              NATURAL FULL JOIN
          (SELECT 'album' AS type, albums.*, a.name AS artist_name FROM albums
              INNER JOIN artists a on albums."artistId" = a.id) albums
      WHERE (name <-> ${query}) < 0.8 OR (artist_name <% ${query}) IS TRUE
      ORDER BY similarity;
    `;
  }
}
