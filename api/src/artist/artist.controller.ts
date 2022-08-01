import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { ArtistService } from "./artist.service";

@Controller("artist")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get("/:id")
  getArtist(
    @Param("id", ParseUUIDPipe) artistId: string,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.ArtistInclude
  ) {
    return this.artistService.findById(artistId, include);
  }
}
