import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { AlbumType, Prisma, Role } from "@prisma/client";

import { ParseIncludeQueryPipe } from "../pipes/parseIncludeQuery.pipe";
import { AlbumService } from "./album.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "../decorators/roles.decorator";
import { EditAlbumDto } from "./dto/editAlbum.dto";
import { OffsetPaginateDto } from "../dto/offsetPaginate.dto";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get("/top-rated")
  findHighestRatedAlbums(@Query() offsetPaginateDto: OffsetPaginateDto) {
    return this.albumService.findHighestRated(offsetPaginateDto);
  }

  @Get("/most-popular")
  findMostPopularAlbums(
    @Query() offsetPaginateDto: OffsetPaginateDto,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.AlbumInclude
  ) {
    return this.albumService.findMostPopular(offsetPaginateDto, include);
  }

  @Get("/:id")
  getAlbum(
    @Param("id", ParseUUIDPipe) albumId: string,
    @Query("include", ParseIncludeQueryPipe) include: Prisma.AlbumInclude
  ) {
    return this.albumService.findById(albumId, include);
  }

  @Get("/:id/ranking")
  getAlbumRanking(@Param("id", ParseUUIDPipe) albumId: string) {
    return this.albumService.findRanking(albumId);
  }

  @Get("/:id/rating")
  getAlbumRating(@Param("id", ParseUUIDPipe) albumId: string) {
    return this.albumService.findRating(albumId);
  }

  @Get("/artist/:id")
  getArtistAlbums(@Param("id", ParseUUIDPipe) artistId: string, @Query("type") albumType: AlbumType) {
    return this.albumService.findArtistAlbums(artistId, albumType);
  }

  @Patch("/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.EDITOR, Role.ADMIN)
  editAlbum(@Param("id", ParseUUIDPipe) albumId: string, @Body() editAlbumDto: EditAlbumDto) {
    return this.albumService.edit(albumId, editAlbumDto);
  }
}
