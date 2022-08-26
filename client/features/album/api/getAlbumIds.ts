import { axios } from "../../../lib/axios";

const getAlbumIds = async () => {
  const { data } = await axios.get<string[]>("album/ids");
  return data;
};

export default getAlbumIds;
