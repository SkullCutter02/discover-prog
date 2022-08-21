import Base from "../../../types/base.interface";
import AlbumType from "./albumType.enum";
import Artist from "../../artist/types/artist.interface";
import Genre from "../../genre/types/genre.interface";

export default interface Album extends Base {
  numericalId?: number;
  name: string;
  releaseYear: number;
  trackListing: string;
  musicians: string;
  albumType: AlbumType;
  imageUrl?: string;
  popularity: number;
  artist?: Artist;
  artistId: string;
  genre?: Genre;
  genreId: string;
}
