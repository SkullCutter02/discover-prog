import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import getAlbumIds from "../../features/album/api/getAlbumIds";

const AlbumPage: React.FC = () => {
  return <></>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  const albumId = ctx.params.albumId;

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAlbumIds();

  return {
    paths: ids.map((id) => ({ params: { albumId: id } })),
    fallback: false,
  };
};

export default AlbumPage;
