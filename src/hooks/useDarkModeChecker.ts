import { useColorMode } from "@chakra-ui/react";

export const useDarkModeChecker = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const changeColorBasedOnTheme = (
    darkModeColor: string,
    lightModeColor: string
  ) => {
    return colorMode === "dark" ? darkModeColor : lightModeColor;
  };

  return { changeColorBasedOnTheme };
};
