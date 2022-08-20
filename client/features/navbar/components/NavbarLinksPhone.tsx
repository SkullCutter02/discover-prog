import React from "react";
import { Text, SimpleGrid, Center } from "@chakra-ui/react";

const NavbarLinksPhone: React.FC = () => {
  return (
    <>
      <SimpleGrid
        h={"35px"}
        alignItems={"center"}
        columns={4}
        bg={"#31135b"}
        display={{ base: "grid", md: "none" }}
        borderBottom={"1px solid #747474"}
      >
        <Text
          h={"full"}
          textStyle={"navbar-link-phone"}
          textAlign={"center"}
          borderRight={"1px solid #747474"}
        >
          <Center h={"full"}>Genres</Center>
        </Text>
        <Text
          h={"full"}
          textStyle={"navbar-link-phone"}
          textAlign={"center"}
          borderRight={"1px solid #747474"}
        >
          <Center h={"full"}>Popular Albums</Center>
        </Text>
        <Text
          h={"full"}
          textStyle={"navbar-link-phone"}
          textAlign={"center"}
          borderRight={"1px solid #747474"}
        >
          <Center h={"full"}>Top Albums</Center>
        </Text>
        <Text h={"full"} textStyle={"navbar-link-phone"} textAlign={"center"}>
          <Center h={"full"}>A-Z</Center>
        </Text>
      </SimpleGrid>
    </>
  );
};

export default NavbarLinksPhone;
