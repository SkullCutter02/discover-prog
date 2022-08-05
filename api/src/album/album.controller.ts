import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { AlbumService } from "./album.service";

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
}
