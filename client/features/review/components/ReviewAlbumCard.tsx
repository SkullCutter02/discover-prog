import React from "react";
import Album from "../../album/types/album.interface";
import { AspectRatio, Box, Image } from "@chakra-ui/react";

interface Props {
  album: Album;
}

const ReviewAlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <>
      <Box float={"left"} bg={"white"} p={3} w={"200px"} mr={4}>
        <AspectRatio w={"full"} ratio={1}>
          <Image src={`https://www.progarchives.com/${album.imageUrl}`} />
        </AspectRatio>
      </Box>
    </>
  );
};

export default ReviewAlbumCard;
