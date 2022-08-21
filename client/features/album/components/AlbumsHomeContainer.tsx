import React, { ReactNode } from "react";
import { Box, Stack } from "@chakra-ui/react";

import Album from "../types/album.interface";
import TopRatedAlbum from "../types/topRatedAlbum.interface";
import AlbumPreviewHome from "./AlbumPreviewHome";

interface Props {
  albums: Album[] | TopRatedAlbum[];
  children: ReactNode;
}

const AlbumsHomeContainer: React.FC<Props> = ({ albums, children }) => {
  return (
    <>
      <Box overflowX={{ base: "scroll", md: "initial" }}>
        {children}
        <Stack mt={5} direction={{ base: "row", md: "column" }} spacing={5}>
          {albums.map((album) => (
            <AlbumPreviewHome key={album.id} album={album} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default AlbumsHomeContainer;
