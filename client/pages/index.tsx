import React from "react";
import { Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import getMostPopularAlbums from "../features/album/api/getMostPopularAlbums";
import getTopRatedAlbums from "../features/album/api/getTopRatedAlbums";
import getRecentReviews from "../features/review/api/getRecentReviews";

const HomePage: React.FC = () => {
  return (
    <>
      <Text color={"primary"}>Hello World</Text>
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
