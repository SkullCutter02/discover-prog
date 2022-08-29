import React from "react";
import { Text, VStack } from "@chakra-ui/react";

import Album from "../types/album.interface";

interface Props {
  album: Album;
}

const AlbumInformation: React.FC<Props> = ({ album }) => {
  return (
    <>
      <VStack spacing={5} w={{ base: "full", sm: "70%" }} pb={2} align={"flex-start"}>
        <Text fontWeight={600} fontSize={16}>
          Songs / Track Listing
        </Text>
        <Text whiteSpace={"pre-line"}>{album.trackListing}</Text>
        <Text fontWeight={600} fontSize={16}>
          Lineup / Musicians
        </Text>
        <Text whiteSpace={"pre-line"}>{album.musicians}</Text>
      </VStack>
    </>
  );
};

export default AlbumInformation;
