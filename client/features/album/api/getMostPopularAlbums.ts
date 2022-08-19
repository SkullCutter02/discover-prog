import { axios } from "../../../lib/axios";

const getMostPopularAlbums = async (page: number, limit: number = 100) => {
  const { data } = await axios.get(`album/most-popular?page=${page}&limit=${limit}&include=artist,genre`);

  return data;
};

export default getMostPopularAlbums;
