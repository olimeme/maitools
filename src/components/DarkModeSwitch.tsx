import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === "dark" ? <SunIcon /> : <MoonIcon />;

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={icon}
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
}

export default DarkModeSwitch;
