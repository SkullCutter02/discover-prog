import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import Album from "../types/album.interface";

interface Props {
  album: Album;
}

const AlbumHeading: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Heading fontWeight={700} fontSize={30} textTransform={"uppercase"}>
        {album.name}
      </Heading>
      <Box
        mt={2}
        fontSize={19}
        fontWeight={600}
        textDecoration={"underline"}
        as={"span"}
        cursor={"pointer"}
        color={"primary"}
      >
        {album.artist.name}
      </Box>
    </>
  );
};

export default AlbumHeading;
