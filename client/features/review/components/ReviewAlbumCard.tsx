import React from "react";
import { AspectRatio, Box, Image, Text, Flex } from "@chakra-ui/react";

import Album from "../../album/types/album.interface";

interface Props {
  album: Album;
}

const ReviewAlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Flex
        float={{ base: "initial", sm: "left" }}
        w={{ base: "full", sm: "30%" }}
        flexDir={{ base: "row", sm: "column" }}
        bg={"white"}
        p={3}
        mr={4}
        mb={{ base: 4, sm: 0 }}
      >
        <AspectRatio w={{ base: "40%", sm: "full" }} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
        <Box w={"full"} ml={{ base: 3, sm: 0 }}>
          <Text
            fontSize={{ base: 15, sm: 14 }}
            mt={{ base: 0, sm: 2 }}
            color={"primary"}
            textDecoration={"underline"}
            cursor={"pointer"}
            fontWeight={600}
            textAlign={{ base: "start", sm: "center" }}
          >
            {album.name}
          </Text>
          <Text mt={0.5} fontSize={13} textAlign={{ base: "start", sm: "center" }}>
            by{" "}
            <Box as={"span"} textTransform={"uppercase"} textDecoration={"underline"} cursor={"pointer"}>
              {album.artist.name}
            </Box>
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default ReviewAlbumCard;
