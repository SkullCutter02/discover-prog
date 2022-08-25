import { axios } from "../../../lib/axios";
import SearchResult from "../types/searchResult.type";

const getSearchResults = async (query: string, page: number, limit: number = 20) => {
  const { data } = await axios.get<SearchResult>(`search?query=${query}&page=${page}&limit=${limit}`);
  return data;
};

export default getSearchResults;
