import React from "react";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Stack } from "@chakra-ui/react";

import getMostPopularAlbums from "../features/album/api/getMostPopularAlbums";
import getTopRatedAlbums from "../features/album/api/getTopRatedAlbums";
import getRecentReviews from "../features/review/api/getRecentReviews";
import MainHomeSection from "../components/ui/home/MainHomeSection";
import AsideHomeSection from "../components/ui/home/AsideHomeSection";

const HomePage: React.FC = () => {
  return (
    <>
      <Stack
        as={"main"}
        spacing={10}
        direction={{ base: "column-reverse", md: "row" }}
        layerStyle={"page-container"}
      >
        <MainHomeSection />
        <AsideHomeSection />
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["popular-albums", "home"], () => getMostPopularAlbums(1, 5));
  await queryClient.prefetchQuery(["top-albums", "home"], () => getTopRatedAlbums(1, 5));
  await queryClient.prefetchQuery(["latest-reviews", "home"], () => getRecentReviews(1, 10));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // one day
  };
};

export default HomePage;
