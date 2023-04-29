import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import PomodoroTimerProvider from "./contexts/PomodoroTimerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <PomodoroTimerProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </PomodoroTimerProvider>
    </ChakraProvider>
  </BrowserRouter>
);
