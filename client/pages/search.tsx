import React from "react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { Box, Heading, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { withAuthServerSideProps } from "../hoc/withAuthServerSideProps";
import getSearchResults from "../features/search/api/getSearchResults";
import Result from "../features/search/components/Result";
import SearchPaginationButton from "../features/search/components/SearchPaginationButton";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const page = parseInt(router.query.page as string);

  const { data: results, isError } = useQuery(["search", query, page], () => getSearchResults(query, page), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <Box layerStyle={"condensed-page-container"} as={"main"}>
        <Heading fontSize={28}>
          <Box as={"span"} fontStyle={"italic"}>
            {query}
          </Box>{" "}
          search results
        </Heading>
        <Divider my={6} />

        {!isError && results && results.length !== 0 ? (
          results.map((result) => <Result result={result} key={result.id} />)
        ) : (
          <p>This search yielded in 0 results</p>
        )}

        <SearchPaginationButton isError={isError} results={results} />
      </Box>
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async (ctx, _, queryClient) => {
    const query = ctx.query.q as string;
    const page = parseInt(ctx.query.page as string);

    await queryClient.prefetchQuery(["search", query, page], () => getSearchResults(query, page));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { authenticatedPage: false }
);

export default SearchPage;
