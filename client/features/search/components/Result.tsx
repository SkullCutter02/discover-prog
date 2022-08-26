import React from "react";
import { AspectRatio, Box, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

import SearchResult from "../types/searchResult.type";

interface Props {
  result: SearchResult;
}

const Result: React.FC<Props> = ({ result }) => {
  return (
    <>
      <Box as={"section"} mb={8}>
        <Link href={result.type === "album" ? `/album/${result.id}` : ""}>
          <Text
            as={"h2"}
            fontSize={18}
            fontWeight={400}
            color={"primary"}
            cursor={"pointer"}
            display={"inline-block"}
          >
            <Box as={"span"} fontWeight={600}>
              {result.name}
            </Box>{" "}
            {result.type === "album" && "by " + result.artist_name} ({result.type})
          </Text>
        </Link>
        <HStack spacing={6} mt={4} align={"flex-start"}>
          <AspectRatio w={{ base: "25%", md: "15%", lg: "10%" }} ratio={1}>
            <Image src={`https://www.progarchives.com/${result.imageUrl}`} w={"fill"} />
          </AspectRatio>
          <Text
            noOfLines={{ base: 3, md: 4 }}
            w={{ base: "75%", md: "85%", lg: "90%" }}
            fontSize={{ base: 15, md: 16 }}
          >
            {result.type === "artist" ? result.biography : result.trackListing}
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default Result;
