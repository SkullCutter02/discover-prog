import React from "react";
import { withAuthServerSideProps } from "../hoc/withAuthServerSideProps";
import { dehydrate } from "@tanstack/react-query";
import getSearchResults from "../features/search/api/getSearchResults";

const SearchPage: React.FC = () => {
  return <></>;
};

export const getServerSideProps = withAuthServerSideProps(
  async (ctx, _, queryClient) => {
    const query = ctx.query.q as string;
    const page = ctx.query.page as string;

    await queryClient.prefetchQuery(["search", query, 1], () => getSearchResults(query, parseInt(page)));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { authenticatedPage: false }
);

export default SearchPage;
