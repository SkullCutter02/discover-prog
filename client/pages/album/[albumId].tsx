import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import getAlbum from "../../features/album/api/getAlbum";
import { useRouter } from "next/router";

const AlbumPage: React.FC = () => {
  const router = useRouter();
  const albumId = router.query.albumId;

  return <>{albumId}</>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const albumId = ctx.query.albumId as string;

  await queryClient.prefetchQuery(["album", albumId], () => getAlbum(albumId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AlbumPage;
