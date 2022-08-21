import React from "react";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Box, Heading, Stack } from "@chakra-ui/react";

import getMostPopularAlbums from "../features/album/api/getMostPopularAlbums";
import getTopRatedAlbums from "../features/album/api/getTopRatedAlbums";
import getRecentReviews from "../features/review/api/getRecentReviews";

const HomePage: React.FC = () => {
  return (
    <>
      <Stack as={"main"} spacing={10} direction={"row"} layerStyle={"page-container"}>
        <Box as={"div"} w={"62%"}>
          <Heading fontSize={24} fontWeight={700}>
            Latest Prog Rock Reviews
          </Heading>
          <Box as={"div"} w={"full"} h={"2.5px"} bg={"black"} mt={3} />
        </Box>
        <Box as={"aside"} w={"38%"}>
          <Heading as={"h2"} fontSize={18} fontWeight={700} textTransform={"uppercase"} mt={5}>
            Most popular album{" "}
            <Box as={"span"} textTransform={"initial"}>
              (last 24h)
            </Box>
          </Heading>
        </Box>
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["latest-reviews", "home"], () => getRecentReviews(1, 10));
  await queryClient.prefetchQuery(["top-albums", "home"], () => getTopRatedAlbums(1, 5));
  await queryClient.prefetchQuery(["popular-albums", "home"], () => getMostPopularAlbums(1, 1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // one day
  };
};

export default HomePage;
