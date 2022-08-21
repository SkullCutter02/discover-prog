import Base from "../../../types/base.interface";
import User from "../../user/types/user.interface";
import Album from "../../album/types/album.interface";

export default interface Review extends Base {
  rating: number;
  body: string;
  user?: User;
  userId: string;
  album?: Album;
  albumId: string;
}
