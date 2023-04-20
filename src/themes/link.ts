import { StyleFunctionProps } from "@chakra-ui/react";

const linkTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: props.colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500",
  }),
};
export { linkTheme };
