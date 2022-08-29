import { axios } from "../../../lib/axios";
import Album from "../types/album.interface";

const getAlbum = async (albumId: string) => {
  const { data } = await axios.get<Album>(`album/${albumId}?include=genre,artist`);

  delete data.genre.description;
  delete data.artist.biography;

  return data;
};

export default getAlbum;
