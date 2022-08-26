import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

import SearchResult from "../types/searchResult.type";

interface Props {
  isError: boolean;
  results: SearchResult[];
}

const SearchPaginationButton: React.FC<Props> = ({ isError, results }) => {
  const router = useRouter();
  const query = router.query.q as string;
  const page = parseInt(router.query.page as string);

  return (
    <>
      <ButtonGroup display={"flex"} justifyContent={"flex-end"} mt={10} variant={"outline"} spacing={6}>
        <Button
          disabled={page <= 1}
          colorScheme={"blue"}
          onClick={() => router.push(`/search?q=${query}&page=${page - 1}`)}
        >
          Previous Page
        </Button>
        <Button
          disabled={isError || results?.length === 0 || results.length < 20}
          colorScheme={"purple"}
          onClick={() => router.push(`/search?q=${query}&page=${page + 1}`)}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </>
  );
};

export default SearchPaginationButton;
