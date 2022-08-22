import React from "react";
import { Box, Button, Heading, Text, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInputControl from "../../components/widgets/TextInputControl";
import LoginFormInput from "../../features/auth/types/loginFormInput.interface";
import useLogin from "../../features/auth/hooks/useLogin";
import { withAuthServerSideProps } from "../../hoc/withAuthServerSideProps";

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInput>({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape<Record<keyof LoginFormInput, yup.AnySchema>>({
        email: yup.string().email().required(),
        password: yup.string().required(),
      })
    ),
  });

  const { isLoading, isError, error, mutate } = useLogin();

  console.log(error);

  return (
    <>
      <Center minH={{ base: "calc(100vh - 105px)", md: "calc(100vh - 80px)" }} w={"50%"} mx={"auto"}>
        <Box w={"full"}>
          <Heading fontSize={26}>Login</Heading>
          <form onSubmit={handleSubmit((input) => mutate(input))}>
            <TextInputControl
              name={"email"}
              label={"Email"}
              inputProps={{ type: "email" }}
              register={register}
              error={errors.email}
              controlProps={{ mt: 3 }}
            />
            <TextInputControl
              name={"password"}
              label={"Password"}
              inputProps={{ type: "password" }}
              register={register}
              error={errors.password}
              controlProps={{ mt: 3 }}
            />
            <Button
              colorScheme={"purple"}
              mt={5}
              mx={"auto"}
              display={"block"}
              type={"submit"}
              disabled={isLoading}
            >
              Login
            </Button>
            {isError && (
              <Text textStyle={"error"} mt={3}>
                {(error as any).response.data.message}
              </Text>
            )}
          </form>
        </Box>
      </Center>
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps(null, { redirectIfUserExists: true });

export default LoginPage;
