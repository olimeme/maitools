import { StyleFunctionProps } from "@chakra-ui/react";
import { DARK_MODE_CARD_BG_COLOR, LIGHT_MODE_CARD_BG_COLOR } from "./colors";

const cardTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    container: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_CARD_BG_COLOR
          : DARK_MODE_CARD_BG_COLOR,
      boxShadow: "lg",
    },
  }),
};
export { cardTheme };
