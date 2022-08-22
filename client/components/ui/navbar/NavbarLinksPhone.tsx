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
        {["Genres", "Popular Albums", "Top Albums", "A-Z"].map((section) => (
          <Center h={"full"} borderRight={"1px solid #747474"} key={section}>
            <Text textStyle={"navbar-link-phone"}>{section}</Text>
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
};

export default NavbarLinksPhone;
