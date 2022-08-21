import React from "react";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { Box, Heading, Stack } from "@chakra-ui/react";

import getMostPopularAlbums from "../features/album/api/getMostPopularAlbums";
import getTopRatedAlbums from "../features/album/api/getTopRatedAlbums";
import getRecentReviews from "../features/review/api/getRecentReviews";
import AlbumPreviewHome from "../features/album/components/AlbumPreviewHome";
import ReviewPreviewHome from "../features/review/components/ReviewPreviewHome";

const HomePage: React.FC = () => {
  const { data: popularAlbums } = useQuery(["popular-albums", "home"], () => getMostPopularAlbums(1, 1));
  const { data: topAlbums } = useQuery(["top-albums", "home"], () => getTopRatedAlbums(1, 5));
  const { data: recentReviews } = useQuery(["latest-reviews", "home"], () => getRecentReviews(1, 10));

  return (
    <>
      <Stack
        as={"main"}
        spacing={10}
        direction={{ base: "column-reverse", md: "row" }}
        layerStyle={"page-container"}
      >
        <Box as={"div"} w={{ base: "full", md: "62%" }}>
          <Heading fontSize={24} fontWeight={700}>
            Latest Prog Rock Reviews
          </Heading>
          <Box as={"div"} w={"full"} h={"2.5px"} bg={"black"} mt={3} />
          {recentReviews.map((review) => (
            <ReviewPreviewHome review={review} key={review.id} />
          ))}
        </Box>

        <Stack
          direction={{ base: "column-reverse", md: "column" }}
          justify={"flex-start"}
          as={"aside"}
          w={{ base: "full", md: "38%" }}
        >
          <Box>
            <Heading
              as={"h2"}
              fontSize={{ base: 17, md: 20 }}
              fontWeight={700}
              textTransform={"uppercase"}
              my={5}
            >
              Most popular album{" "}
              <Box as={"span"} textTransform={"initial"}>
                (last 24h)
              </Box>
            </Heading>
            <AlbumPreviewHome album={popularAlbums[0]} />
          </Box>

          <Box overflowX={{ base: "scroll", md: "initial" }}>
            <Heading
              as={"h2"}
              fontSize={{ base: 17, md: 20 }}
              fontWeight={700}
              textTransform={"uppercase"}
              mt={{ base: 0, md: 10 }}
            >
              Top 5 prog rock albums
            </Heading>
            <Stack mt={5} direction={{ base: "row", md: "column" }} spacing={5}>
              {topAlbums.map((album) => (
                <AlbumPreviewHome key={album.id} album={album} />
              ))}
            </Stack>
          </Box>
        </Stack>
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
