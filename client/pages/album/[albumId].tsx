import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Box, Stack } from "@chakra-ui/react";

import getAlbum from "../../features/album/api/getAlbum";
import AlbumHeading from "../../features/album/components/AlbumHeading";
import AlbumImageAndRating from "../../features/album/components/AlbumImageAndRating";
import AlbumInformation from "../../features/album/components/AlbumInformation";
import getAlbumRating from "../../features/album/api/getAlbumRating";

const AlbumPage: React.FC = () => {
  const router = useRouter();
  const albumId = router.query.albumId as string;

  const { data: album } = useQuery(["album", albumId], () => getAlbum(albumId));

  return (
    <>
      <Box layerStyle={"condensed-page-container"} as={"main"}>
        <AlbumHeading album={album} />
        <Stack mt={8} spacing={10} align={"flex-start"} direction={{ base: "column", sm: "row" }}>
          <AlbumImageAndRating album={album} />
          <AlbumInformation album={album} />
        </Stack>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const albumId = ctx.query.albumId as string;

  await queryClient.prefetchQuery(["album", albumId], () => getAlbum(albumId));
  await queryClient.prefetchQuery(["album-rating", albumId], () => getAlbumRating(albumId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AlbumPage;
