import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { AlbumService } from "./album.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { EditAlbumDto } from "./dto/editAlbum.dto";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get("/:id")
  getAlbum(
    @Param("id", ParseUUIDPipe) albumId: string,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.AlbumInclude
  ) {
    return this.albumService.findById(albumId, include);
  }

  @Patch("/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  editAlbum(@Param("id", ParseUUIDPipe) albumId: string, @Body() editAlbumDto: EditAlbumDto) {
    return this.albumService.edit(albumId, editAlbumDto);
  }
}
