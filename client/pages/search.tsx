import React from "react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { Box, Heading, Divider } from "@chakra-ui/react";

import { withAuthServerSideProps } from "../hoc/withAuthServerSideProps";
import getSearchResults from "../features/search/api/getSearchResults";
import { useRouter } from "next/router";
import Result from "../features/search/components/Result";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const page = parseInt(router.query.page as string);

  const { data: results } = useQuery(["search", query, page], () => getSearchResults(query, page));

  return (
    <>
      <Box layerStyle={"page-container"} as={"main"} px={{ base: 5, sm: 9, md: "11vw" }}>
        <Heading fontSize={28}>
          <Box as={"span"} fontStyle={"italic"}>
            {query}
          </Box>{" "}
          search results
        </Heading>
        <Divider my={6} />
        {results.map((result) => (
          <Result result={result} key={result.id} />
        ))}
      </Box>
    </>
  );
};

export const getServerSideProps = withAuthServerSideProps(
  async (ctx, _, queryClient) => {
    const query = ctx.query.q as string;
    const page = parseInt(ctx.query.page as string);

    await queryClient.prefetchQuery(["search", query, 1], () => getSearchResults(query, page));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { authenticatedPage: false }
);

export default SearchPage;
