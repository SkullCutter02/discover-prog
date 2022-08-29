import { axios } from "../../../lib/axios";

const getAlbumRating = async (albumId: string) => {
  const { data } = await axios.get<{ avgRating: number; numOfReviews: number }>(`album/${albumId}/rating`);
  return data;
};

export default getAlbumRating;
