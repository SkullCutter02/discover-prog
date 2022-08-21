import Base from "../../../types/base.interface";
import Album from "../../album/types/album.interface";

export default interface Artist extends Base {
  numericalId?: number;
  name: string;
  biography: string;
  imageUrl: string;
  country: string;
  albums?: Album[];
}
