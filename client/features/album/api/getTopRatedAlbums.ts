import { axios } from "../../../lib/axios";
import TopRatedAlbum from "../types/topRatedAlbum.interface";

const getTopRatedAlbums = async (page: number, limit: number = 100) => {
  const { data } = await axios.get<TopRatedAlbum[]>(`album/top-rated?page=${page}&limit=${limit}`);

  data.forEach((album) => {
    delete album.trackListing;
    delete album.musicians;
  });

  return data;
};

export default getTopRatedAlbums;
