import Base from "../../../types/base.interface";
import Role from "./role.enum";

export default interface User extends Base {
  name: string;
  email: string;
  role: Role;
}
