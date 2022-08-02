import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { ArtistService } from "./artist.service";
import { Roles } from "../decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";

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

  @Patch("/:id/biography")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  editBiography(@Param("id", ParseUUIDPipe) artistId: string, @Body("biography") biography: string) {
    return this.artistService.edit(artistId, { biography });
  }
}
