import { axios } from "../../../lib/axios";
import Review from "../types/review.interface";

const getRecentReviews = async (page: number, limit: number) => {
  const { data } = await axios.get<Review[]>(
    `review/latest?page=${page}&limit=${limit}&include=album,album.artist,user`
  );

  return data;
};

export default getRecentReviews;
