import React from "react";
import Link from "next/link";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

import getMe from "../../../features/auth/api/getMe";

const NavbarUser: React.FC = () => {
  const { data: user } = useQuery(["user"], () => getMe());

  return (
    <>
      <Box mx={{ base: 2, md: 6 }}>
        {!user ? (
          <Link href={"/auth/login"}>
            <Button
              bg={"#31135b"}
              _hover={{ bg: "#1c0838" }}
              _active={{ bg: "#2a0a54" }}
              textColor={"white"}
              fontSize={{ base: 12, sm: 14, md: 18 }}
              borderRadius={"30px"}
            >
              Sign In
            </Button>
          </Link>
        ) : (
          <HStack spacing={3} align={"center"}>
            <FaUserAlt color={"white"} size={"18px"} />
            <Text color={"white"}>{user.name}</Text>
          </HStack>
        )}
      </Box>
    </>
  );
};

export default NavbarUser;
