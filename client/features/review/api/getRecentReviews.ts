import { axios } from "../../../lib/axios";

const getRecentReviews = async (page: number, limit: number) => {
  const { data } = await axios.get(`review/latest?page=${page}&limit=${limit}&include=album`);

  return data;
};

export default getRecentReviews;
