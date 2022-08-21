import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

import Review from "../types/review.interface";
import ReviewAlbumCard from "./ReviewAlbumCard";

interface Props {
  review: Review;
}

const ReviewPreviewHome: React.FC<Props> = ({ review }) => {
  return (
    <>
      <Box bg={"#efefef"} overflow={"hidden"} mt={4} p={5}>
        <ReviewAlbumCard album={review.album} />
        <Flex>
          <Text fontWeight={600} mr={3}>
            Review by {review.user.name}
          </Text>
          <HStack spacing={2}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar key={review.id + review.user.id + i} color={i < review.rating ? "#ffce31" : "gray"} />
              ))}
          </HStack>
        </Flex>
        <Text fontSize={14} whiteSpace={"pre-line"} mt={3}>
          {review.body}
        </Text>
      </Box>
    </>
  );
};

export default ReviewPreviewHome;
