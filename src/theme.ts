import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import {
  DARK_MODE_BODY_BG_COLOR,
  LIGHT_MODE_BODY_BG_COLOR,
} from "./themes/colors";
import { menuTheme } from "./themes/menu";
import { cardTheme } from "./themes/card";
import { linkTheme } from "./themes/link";

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
  fonts: {
    heading: `'Quicksand', sans-serif`,
    body: `'Quicksand', sans-serif`,
  },
  config: {
    disableTransitionOnChange: false,
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Menu: menuTheme,
    Card: cardTheme,
    Link: linkTheme,
  },
});

export default theme;
