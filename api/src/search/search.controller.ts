import { Controller, Get, Query } from "@nestjs/common";

import { SearchService } from "./search.service";
import { OffsetPaginateDto } from "../shared/offsetPaginate.dto";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchWithQuery(@Query("query") query: string, @Query() offsetPaginateDto: OffsetPaginateDto) {
    return this.searchService.searchWithQuery(query, offsetPaginateDto);
  }
}
