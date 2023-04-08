import { menuAnatomy } from "@chakra-ui/anatomy";
import { StyleFunctionProps } from "@chakra-ui/react";
import {
  DARK_MODE_MENU_BG_COLOR,
  DARK_MODE_MENU_ITEM_HOVER_COLOR,
  LIGHT_MODE_MENU_BG_COLOR,
  LIGHT_MODE_MENU_ITEM_HOVER_COLOR,
} from "./colors";

const menuTheme = {
  baseStyle: (props: StyleFunctionProps) => ({
    list: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_MENU_BG_COLOR
          : DARK_MODE_MENU_BG_COLOR,
      boxShadow: "lg",
    },
    item: {
      bg:
        props.colorMode === "light"
          ? LIGHT_MODE_MENU_BG_COLOR
          : DARK_MODE_MENU_BG_COLOR,
      _hover: {
        bg:
          props.colorMode === "light"
            ? LIGHT_MODE_MENU_ITEM_HOVER_COLOR
            : DARK_MODE_MENU_ITEM_HOVER_COLOR,
      },
    },
  }),
};
export { menuTheme };
