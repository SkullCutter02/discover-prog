import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import AlbumsHomeContainer from "../../../features/album/components/AlbumsHomeContainer";
import getMostPopularAlbums from "../../../features/album/api/getMostPopularAlbums";
import getTopRatedAlbums from "../../../features/album/api/getTopRatedAlbums";

const AsideHomeSection: React.FC = () => {
  const { data: popularAlbums } = useQuery(["popular-albums", "home"], () => getMostPopularAlbums(1, 5), {
    enabled: false,
  });
  const { data: topAlbums } = useQuery(["top-albums", "home"], () => getTopRatedAlbums(1, 5), {
    enabled: false,
  });

  return (
    <>
      <Stack
        direction={{ base: "column-reverse", md: "column" }}
        justify={"flex-start"}
        as={"aside"}
        w={{ base: "full", md: "38%" }}
      >
        <AlbumsHomeContainer albums={popularAlbums}>
          <Heading
            as={"h2"}
            fontSize={{ base: 17, md: 20 }}
            fontWeight={700}
            textTransform={"uppercase"}
            my={5}
          >
            Top 5 most popular albums{" "}
            <Box as={"span"} textTransform={"initial"}>
              (last 24h)
            </Box>
          </Heading>
        </AlbumsHomeContainer>

        <AlbumsHomeContainer albums={topAlbums}>
          <Heading
            as={"h2"}
            fontSize={{ base: 17, md: 20 }}
            fontWeight={700}
            textTransform={"uppercase"}
            mt={{ base: 0, md: 10 }}
          >
            Top 5 prog rock albums of all time
          </Heading>
        </AlbumsHomeContainer>
      </Stack>
    </>
  );
};

export default AsideHomeSection;
