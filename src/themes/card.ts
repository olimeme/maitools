import { StyleFunctionProps } from "@chakra-ui/react";
import { DARK_MODE_CARD_BG_COLOR, LIGHT_MODE_CARD_BG_COLOR } from "./colors";

const cardTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    container: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_CARD_BG_COLOR
          : DARK_MODE_CARD_BG_COLOR,
      boxShadow: "md",
      borderRadius: "xl",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor:
        props.colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100",
    },
  }),
};
export { cardTheme };
