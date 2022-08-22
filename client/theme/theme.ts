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
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  textStyles: {
    "navbar-link": {
      cursor: "pointer",
      color: "white",
      fontSize: 17,
    },
    "navbar-link-phone": {
      cursor: "pointer",
      color: "white",
      fontSize: { base: 12, sm: 14 },
      fontWeight: "bond",
    },
    error: {
      color: "#bd1717",
      fontSize: 15,
    },
  },
  layerStyles: {
    "page-container": {
      py: 14,
      px: { base: 5, md: 10 },
    },
  },
});

export default theme;
