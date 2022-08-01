import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  searchWithQuery(query: string) {
    const ilike = `%${query}%`;

    return this.prisma.$queryRaw`
      SELECT *, (
          CASE 
              WHEN type = 'artist' THEN (unaccent(name) <-> ${query})
              WHEN type = 'album' THEN
                  CASE
                      WHEN unaccent(artist_name) <-> ${query} < 0.5 THEN (unaccent(artist_name) <-> ${query}) + 0.01
                      WHEN unaccent(artist_name) <-> ${query} >= 0.5 THEN (unaccent(name) <-> ${query}) + 0.05
                  END
          END
      ) AS rank
      FROM
          (SELECT 'artist' AS type, artists.* FROM artists) artists
              NATURAL FULL JOIN
          (SELECT 'album' AS type, albums.*, a.name AS artist_name FROM albums
              INNER JOIN artists a on albums."artistId" = a.id) albums
      WHERE unaccent(name) ILIKE ${ilike} 
         OR (unaccent(name) <-> ${query}) < 0.7
         OR (unaccent(artist_name) <% ${query}) IS TRUE
      ORDER BY rank; 
    `;
  }
}
