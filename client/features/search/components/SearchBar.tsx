import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar: React.FC = () => {
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
        />
        <Input
          bg={"#d6cde4"}
          placeholder={"Search your favourite artists or albums..."}
          borderRadius={"100px"}
          h={"full"}
        />
      </InputGroup>
    </>
  );
};

export default SearchBar;
