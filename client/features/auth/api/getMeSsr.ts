import { GetServerSidePropsContext } from "next";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

import { axios } from "../../../lib/axios";
import getRefreshTokenSsr from "./getRefreshTokenSsr";
import User from "../../user/types/user.interface";

const getMeSsr = async (ctx?: GetServerSidePropsContext) => {
  let user: User;
  let counter = 0;

  while (!user && counter <= 1) {
    try {
      const axiosConfig: AxiosAuthRefreshRequestConfig = {
        headers: { Cookie: ctx.req.headers.cookie },
        skipAuthRefresh: true,
      };
      const { data } = await axios.get<User>("user/me", axiosConfig);
      user = data;
    } catch (err) {
      await getRefreshTokenSsr(ctx);
      counter++;
    }
  }

  return user;
};

export default getMeSsr;
