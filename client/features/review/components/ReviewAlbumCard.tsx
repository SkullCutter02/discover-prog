import React from "react";
import { AspectRatio, Box, Image, Text, Flex } from "@chakra-ui/react";

import Album from "../../album/types/album.interface";

interface Props {
  album: Album;
}

const ReviewAlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Box float={"left"} bg={"white"} p={3} w={"30%"} mr={4}>
        <AspectRatio w={"full"} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
        <Flex flexDir={"column"} align={"center"}>
          <Text
            fontSize={14}
            mt={2}
            color={"primary"}
            textDecoration={"underline"}
            cursor={"pointer"}
            fontWeight={600}
            textAlign={"center"}
          >
            {album.name}
          </Text>
          <Text mt={0.5} fontSize={13} textAlign={"center"}>
            by{" "}
            <Box as={"span"} textTransform={"uppercase"} textDecoration={"underline"} cursor={"pointer"}>
              {album.artist.name}
            </Box>
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default ReviewAlbumCard;
