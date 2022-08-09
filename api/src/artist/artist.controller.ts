import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { ArtistService } from "./artist.service";
import { Roles } from "../decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { EditAlbumDto } from "../album/dto/editAlbum.dto";

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

  @Patch("/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  edit(@Param("id", ParseUUIDPipe) artistId: string, @Body() editAlbumDto: EditAlbumDto) {
    return this.artistService.edit(artistId, editAlbumDto);
  }
}
