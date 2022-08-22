import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import LoginFormInput from "../types/loginFormInput.interface";
import { axios } from "../../../lib/axios";

export default function useLogin() {
  const router = useRouter();

  return useMutation(
    async (input: LoginFormInput) => {
      console.log(input);
      await axios.post("auth/login", input);
    },
    {
      onSuccess: () => router.push("/"),
    }
  );
}
