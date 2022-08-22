import React from "react";
import { Box, HStack, Text, Wrap, WrapItem } from "@chakra-ui/react";

import Star from "../../../components/widgets/Star";
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
        <Wrap spacing={3} align={"center"}>
          <WrapItem>
            <Text fontWeight={600}>Review by {review.user.name}</Text>
          </WrapItem>
          <WrapItem>
            <HStack spacing={2}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Star key={review.id + review.user.id + i} isFilled={i < review.rating} />
                ))}
            </HStack>
          </WrapItem>
        </Wrap>
        <Text fontSize={14} whiteSpace={"pre-line"} mt={3}>
          {review.body}
        </Text>
      </Box>
    </>
  );
};

export default ReviewPreviewHome;
