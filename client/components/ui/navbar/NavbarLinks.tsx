import React from "react";
import { HStack, Text } from "@chakra-ui/react";

const NavbarLinks: React.FC = () => {
  return (
    <>
      <HStack spacing={4} display={{ base: "none", md: "flex" }}>
        <Text textStyle={"navbar-link"}>Genres</Text>
        <Text textStyle={"navbar-link"}>Popular Albums</Text>
        <Text textStyle={"navbar-link"}>Top Albums</Text>
        <Text textStyle={"navbar-link"}>A-Z</Text>
      </HStack>
    </>
  );
};

export default NavbarLinks;
