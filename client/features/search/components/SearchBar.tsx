import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

import useSearch from "../hooks/useSearch";
import useSearchQuery from "../hooks/useSearchQuery";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  const startSearch = useSearch(searchQuery);

  return (
    <>
      <InputGroup
        h={"50%"}
        maxW={"800px"}
        w={{ base: "80%", md: "45%" }}
        minW={"100px"}
        mr={{ base: 1, md: 5 }}
      >
        <InputLeftElement
          h={"full"}
          children={<AiOutlineSearch cursor={"pointer"} size={"25px"} color={"#80728f"} />}
          onClick={startSearch}
        />
        <Input
          bg={"#d6cde4"}
          placeholder={"Search your favourite artists or albums..."}
          borderRadius={"100px"}
          h={"full"}
          fontSize={{ base: 15, md: 16 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") await startSearch();
          }}
        />
      </InputGroup>
    </>
  );
};

export default SearchBar;
