import Album from "./album.interface";

export default interface TopRatedAlbum extends Omit<Album, "artist" | "genre"> {
  popularity: number;
  qwr: number;
  artistName: string;
  genreName: string;
  rank: number;
  numOfReviews: number;
  averageRating: number;
}
