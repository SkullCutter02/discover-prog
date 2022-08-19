import React from "react";
import { Text } from "@chakra-ui/react";

const HomePage: React.FC = () => {
  return (
    <>
      <Text color={"primary"}>Hello World</Text>
    </>
  );
};

// export const getServerSideProps = withAuthServerSideProps(null, { authenticatedPage: false });

export default HomePage;
