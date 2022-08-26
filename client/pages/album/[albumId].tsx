import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import getAlbumIds from "../../features/album/api/getAlbumIds";
import getAlbum from "../../features/album/api/getAlbum";

const AlbumPage: React.FC = () => {
  return <></>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  const albumId = ctx.params.albumId as string;

  await queryClient.prefetchQuery(["album", albumId], () => getAlbum(albumId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // one day
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAlbumIds();

  return {
    paths: ids.map((id) => ({ params: { albumId: id } })),
    fallback: "blocking",
  };
};

export default AlbumPage;
