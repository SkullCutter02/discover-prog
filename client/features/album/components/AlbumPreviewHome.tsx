import React from "react";
import { Box, HStack, Image, Text, AspectRatio } from "@chakra-ui/react";

import Album from "../types/album.interface";
import TopRatedAlbum from "../types/topRatedAlbum.interface";

interface Props {
  album: Album | TopRatedAlbum;
}

const AlbumPreviewHome: React.FC<Props> = ({ album }) => {
  return (
    <>
      <HStack w={"100%"} align={"flex-start"} spacing={5} mt={5}>
        <AspectRatio w={"35%"} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
        <Box w={"65%"}>
          <Text
            color={"primary"}
            fontSize={18.5}
            cursor={"pointer"}
            fontWeight={600}
            textDecoration={"underline"}
            display={"inline-block"}
          >
            {album.name}
          </Text>
          <Text fontSize={15}>
            by{" "}
            <Box as={"span"} textTransform={"uppercase"}>
              {"artist" in album ? album?.artist.name : "artistName" in album ? album.artistName : null}
            </Box>
          </Text>
          <Text fontSize={16} mt={1} color={"gray.500"}>
            {"genre" in album ? album?.genre.name : "genreName" in album ? album.genreName : null}
          </Text>
        </Box>
      </HStack>
    </>
  );
};

export default AlbumPreviewHome;
