import Artist from "../../artist/types/artist.interface";
import Album from "../../album/types/album.interface";

interface ArtistSearchResult extends Artist {
  type: "artist";
}

interface AlbumSearchResult extends Album {
  type: "album";
  artist_name: string;
}

type SearchResult = (ArtistSearchResult | AlbumSearchResult) & { rank: number };

export default SearchResult;
