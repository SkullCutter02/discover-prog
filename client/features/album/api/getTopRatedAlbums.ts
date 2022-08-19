import { axios } from "../../../lib/axios";

const getTopRatedAlbums = async (page: number, limit: number = 100) => {
  const { data } = await axios.get(`album/top-rated?page=${page}&limit=${limit}`);

  return data;
};

export default getTopRatedAlbums;
