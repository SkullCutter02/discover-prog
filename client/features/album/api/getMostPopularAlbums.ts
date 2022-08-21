import { axios } from "../../../lib/axios";
import Album from "../types/album.interface";

const getMostPopularAlbums = async (page: number, limit: number = 100) => {
  const { data } = await axios.get<Album[]>(
    `album/most-popular?page=${page}&limit=${limit}&include=artist,genre`
  );

  return data;
};

export default getMostPopularAlbums;
