import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import theme from "./theme";

const extendedTheme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        transitionProperty: "all",
        transitionDuration: "normal",
        bg: props.colorMode === "light" ? "white" : "#2e2e2e",
      },
    }),
  },
  config: {
    disableTransitionOnChange: false,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={extendedTheme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);
