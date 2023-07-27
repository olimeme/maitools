import { StyleFunctionProps } from "@chakra-ui/react";
import { DARK_MODE_CARD_BG_COLOR, LIGHT_MODE_CARD_BG_COLOR } from "./colors";

const popoverTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    content: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_CARD_BG_COLOR
          : DARK_MODE_CARD_BG_COLOR,
      boxShadow: "md",
    },
  }),
};
export { popoverTheme };
