import { axios } from "../../../lib/axios";

const getSearchResults = async (query: string, page: number, limit: number = 20) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}&limit=${limit}`);
  return data;
};

export default getSearchResults;
