import React from "react";
import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";

import SearchBar from "../../../features/search/components/SearchBar";
import NavbarLinks from "./NavbarLinks";
import NavbarLinksPhone from "./NavbarLinksPhone";
import NavbarUser from "./NavbarUser";

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
        <Link href={"/"}>
          <Text
            color={"white"}
            cursor={"pointer"}
            fontSize={{ base: 15, sm: 16, md: 18 }}
            fontWeight={700}
            mx={{ base: 2, md: 6 }}
          >
            Discover Prog
          </Text>
        </Link>
        <SearchBar />
        <NavbarLinks />
        <NavbarUser />
      </Flex>
      <NavbarLinksPhone />
    </>
  );
};

export default Navbar;
