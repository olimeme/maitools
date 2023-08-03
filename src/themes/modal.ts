import { StyleFunctionProps } from "@chakra-ui/react";
import { DARK_MODE_BODY_BG_COLOR, LIGHT_MODE_BODY_BG_COLOR } from "./colors";

const modalTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    dialog: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_BODY_BG_COLOR
          : DARK_MODE_BODY_BG_COLOR,
      boxShadow: "none",
      borderRadius: "xl",
    },
  }),
};
export { modalTheme };
