import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import {
  DARK_MODE_BODY_BG_COLOR,
  LIGHT_MODE_BODY_BG_COLOR,
} from "./themes/colors";
import { menuTheme } from "./themes/menu";
import { cardTheme } from "./themes/card";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg:
          props.colorMode === "light"
            ? LIGHT_MODE_BODY_BG_COLOR
            : DARK_MODE_BODY_BG_COLOR,
        transitionProperty: "all",
        transitionDuration: "normal",
      },
    }),
  },
  config: {
    disableTransitionOnChange: false,
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Menu: menuTheme,
    Card: cardTheme,
  },
});

export default theme;
