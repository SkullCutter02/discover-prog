import React from "react";
import { AspectRatio, Box, Image } from "@chakra-ui/react";

import Album from "../types/album.interface";

interface Props {
  album: Album;
}

const AlbumImageAndRating: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Box w={"30%"} pb={2}>
        <AspectRatio w={"full"} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
      </Box>
    </>
  );
};

export default AlbumImageAndRating;
