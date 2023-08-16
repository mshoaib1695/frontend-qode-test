import { extendTheme } from "@chakra-ui/react";

const config = {
  fontSizes: {
    lg: "18px",
  },
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#f5f5f5",
    text: "#333333",
  },
};

export const theme = extendTheme({ config });
