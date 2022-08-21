import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

import SearchBar from "../../search/components/SearchBar";
import NavbarLinks from "./NavbarLinks";
import NavbarLinksPhone from "./NavbarLinksPhone";

const Navbar: React.FC = () => {
  return (
    <>
      <Flex
        align={"center"}
        justify={"space-between"}
        h={{ base: "70px", md: "80px" }}
        bg={"primary"}
        boxShadow={{ base: "dark-lg", md: "xl" }}
      >
        <Text
          color={"white"}
          cursor={"pointer"}
          fontSize={{ base: 15, sm: 16, md: 18 }}
          fontWeight={700}
          mx={{ base: 2, md: 6 }}
        >
          Discover Prog
        </Text>
        <SearchBar />
        <NavbarLinks />
        <Button
          bg={"#31135b"}
          _hover={{ bg: "#1c0838" }}
          _active={{ bg: "#2a0a54" }}
          textColor={"white"}
          fontSize={{ base: 12, sm: 14, md: 18 }}
          mx={{ base: 2, md: 6 }}
          borderRadius={"30px"}
        >
          Sign In
        </Button>
      </Flex>
      <NavbarLinksPhone />
    </>
  );
};

export default Navbar;
