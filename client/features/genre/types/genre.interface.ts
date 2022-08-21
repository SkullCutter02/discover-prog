import Base from "../../../types/base.interface";
import Album from "../../album/types/album.interface";

export default interface Genre extends Omit<Base, "id"> {
  id: number;
  name: string;
  description: string;
  albums?: Album[];
}
