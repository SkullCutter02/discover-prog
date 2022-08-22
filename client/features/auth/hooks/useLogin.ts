import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import LoginFormInput from "../types/loginFormInput.interface";
import { axios } from "../../../lib/axios";
import User from "../../user/types/user.interface";

export default function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async (input: LoginFormInput) => {
      const { data } = await axios.post<User>("auth/login", input);
      return data;
    },
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(["user"], data);
        await router.push("/");
      },
    }
  );
}
