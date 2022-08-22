import React from "react";
import { Box, Image, Text, AspectRatio, Stack } from "@chakra-ui/react";

import Album from "../types/album.interface";
import TopRatedAlbum from "../types/topRatedAlbum.interface";

interface Props {
  album: Album | TopRatedAlbum;
}

const AlbumPreviewHome: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        minW={{ base: "150px", md: "initial" }}
        w={{ base: "150px", md: "100%" }}
        align={"flex-start"}
        spacing={5}
      >
        <AspectRatio w={{ base: "full", md: "35%" }} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
        <Box w={{ base: "full", md: "65%" }}>
          <Text
            color={"primary"}
            fontSize={{ base: 14, md: 16, lg: 18 }}
            cursor={"pointer"}
            fontWeight={600}
            textDecoration={"underline"}
            display={"inline-block"}
          >
            {album.name}
          </Text>
          <Text fontSize={{ base: 13, md: 15 }}>
            by{" "}
            <Box as={"span"} textTransform={"uppercase"}>
              {"artist" in album ? album?.artist.name : "artistName" in album ? album.artistName : null}
            </Box>
          </Text>
          <Text fontSize={{ base: 13, md: 15 }} mt={1} color={"gray.500"}>
            {"genre" in album ? album?.genre.name : "genreName" in album ? album.genreName : null}
          </Text>
        </Box>
      </Stack>
    </>
  );
};

export default AlbumPreviewHome;
