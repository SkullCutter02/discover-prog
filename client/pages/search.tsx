import React from "react";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { Box, Heading, Divider, Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { withAuthServerSideProps } from "../hoc/withAuthServerSideProps";
import getSearchResults from "../features/search/api/getSearchResults";
import Result from "../features/search/components/Result";

const SearchPage: React.FC = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const page = parseInt(router.query.page as string);

  const { data: results, isError } = useQuery(["search", query, page], () => getSearchResults(query, page));

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

        {!isError && results && results.length !== 0 ? (
          results.map((result) => <Result result={result} key={result.id} />)
        ) : (
          <p>This search yielded in 0 results</p>
        )}

        <ButtonGroup display={"flex"} justifyContent={"flex-end"} mt={10} variant={"outline"} spacing={6}>
          <Button
            disabled={page <= 1}
            colorScheme={"blue"}
            onClick={() => router.push(`/search?q=${query}&page=${page - 1}`)}
          >
            Previous Page
          </Button>
          <Button
            disabled={isError || results?.length === 0 || results.length < 20}
            colorScheme={"purple"}
            onClick={() => router.push(`/search?q=${query}&page=${page + 1}`)}
          >
            Next Page
          </Button>
        </ButtonGroup>
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
