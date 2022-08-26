import { axios } from "../../../lib/axios";
import Album from "../types/album.interface";

const getMostPopularAlbums = async (page: number, limit: number = 100) => {
  const { data } = await axios.get<Album[]>(
    `album/most-popular?page=${page}&limit=${limit}&include=artist,genre`
  );

  data.forEach((album) => {
    delete album.trackListing;
    delete album.musicians;
    delete album?.artist.biography;
    delete album?.genre.description;
  });

  return data;
};

export default getMostPopularAlbums;
