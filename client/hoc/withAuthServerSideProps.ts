import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate, DehydratedState } from "@tanstack/react-query";

import User from "../features/user/types/user.interface";
import getMeSsr from "../features/auth/api/getMeSsr";

type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export type InferWithAuthServerSideProps<T extends (...args: any) => Promise<{ props: any }>> =
  AsyncReturnType<T>["props"];

type WithAuthServerSidePropsOptions = {
  authenticatedPage?: boolean;
  redirectIfUserExists?: boolean;
};

export type AuthenticatedPageProps = {
  user: User;
};

type EmptyProps = {
  props: Record<string, unknown>;
};

type DefaultWithAuthServerSideProps = {
  dehydratedState: DehydratedState;
};

function withAuthServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user?: User,
    queryClient?: QueryClient
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = { authenticatedPage: true, redirectIfUserExists: false }
) {
  return async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext
  ): Promise<{ props: T["props"] & DefaultWithAuthServerSideProps }> {
    const queryClient = new QueryClient();
    let loggedInUser: User | null;

    try {
      loggedInUser = await getMeSsr(ctx);
    } catch {
      loggedInUser = null;
    }

    queryClient.setQueryData(["user"], loggedInUser);

    if (options.redirectIfUserExists && loggedInUser) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown as { props: T["props"] & DefaultWithAuthServerSideProps };
    }

    if (options.authenticatedPage && !loggedInUser) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown as { props: T["props"] & DefaultWithAuthServerSideProps };
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          ...((await getServerSidePropsFunc(ctx, loggedInUser, queryClient)).props || {}),
        },
      };
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
}

export { withAuthServerSideProps };
