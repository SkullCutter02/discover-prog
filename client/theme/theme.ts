import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  sizes: {
    "4xs": "10rem",
    "5xs": "6rem",
    "6xs": "2rem",
  },
  colors: {
    primary: "#412071",
    error: "#bd1717",
  },
});

export default theme;
