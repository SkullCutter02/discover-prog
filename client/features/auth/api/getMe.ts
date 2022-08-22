import { axios } from "../../../lib/axios";
import User from "../../user/types/user.interface";

const getMe = async () => {
  const { data } = await axios.get<User>("auth/me");
  return data;
};

export default getMe;
