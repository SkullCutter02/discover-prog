import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import ReviewPreviewHome from "../../../features/review/components/ReviewPreviewHome";
import getRecentReviews from "../../../features/review/api/getRecentReviews";

const MainHomeSection: React.FC = () => {
  const { data: recentReviews } = useQuery(["latest-reviews", "home"], () => getRecentReviews(1, 10));

  return (
    <>
      <Box as={"div"} w={{ base: "full", md: "62%" }}>
        <Heading fontSize={24} fontWeight={700}>
          Latest Prog Rock Reviews
        </Heading>
        <Box as={"div"} w={"full"} h={"2.5px"} bg={"black"} mt={3} />
        {recentReviews.map((review) => (
          <ReviewPreviewHome review={review} key={review.id} />
        ))}
      </Box>
    </>
  );
};

export default MainHomeSection;
