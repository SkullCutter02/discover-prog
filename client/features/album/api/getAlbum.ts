import { axios } from "../../../lib/axios";
import Album from "../types/album.interface";

const getAlbum = async (albumId: string) => {
  const { data } = await axios.get<Album[]>(`album/${albumId}?include=genre`);
  return data;
};

export default getAlbum;
