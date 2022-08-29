import React from "react";
import { AspectRatio, Box, Image, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import Album from "../types/album.interface";
import getAlbumRating from "../api/getAlbumRating";

interface Props {
  album: Album;
}

const AlbumImageAndRating: React.FC<Props> = ({ album }) => {
  const { data: albumRating } = useQuery(["album-rating", album.id], () => getAlbumRating(album.id));

  return (
    <>
      <Box w={"30%"} pb={2}>
        <AspectRatio w={"full"} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>

        <VStack mt={4} align={"flex-start"} fontWeight={500} spacing={3}>
          <Text>
            Type:{" "}
            <Box as={"span"} textTransform={"capitalize"}>
              {album.albumType.toLowerCase()}
            </Box>
          </Text>
          <Text>
            Rating:{" "}
            <Box as={"span"} fontSize={20} fontWeight={700} color={"orange.400"}>
              {albumRating.avgRating}
            </Box>{" "}
            / 5 from {albumRating.numOfReviews} ratings
          </Text>
          <Text>Genre: {album.genre.name}</Text>
        </VStack>
      </Box>
    </>
  );
};

export default AlbumImageAndRating;
