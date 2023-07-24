import { useContext, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkMode";
import { Link } from "react-router-dom";
import { PomodoroTimerContext } from "../contexts/PomodoroTimerContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavigationDrawer from "./Drawer/NavigationDrawer";
const Navbar = () => {
  const {
    data: { displayTimeRemaining, isPomodoroPageOpen, isActive },
  } = useContext(PomodoroTimerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Box p="4">
        <Link to={"/"}>
          <Button variant="ghost">maitools</Button>
        </Link>
      </Box>
      <Spacer />
      {!isPomodoroPageOpen && isActive && (
        <Tooltip label={"Pomodoro timer"} fontSize={"md"}>
          <Box py="4">
            <Link to={"/pomodoro-timer"}>
              <Button variant={"ghost"}>
                <Text>{displayTimeRemaining}</Text>
              </Button>
            </Link>
          </Box>
        </Tooltip>
      )}
      <Box p="4">
        <Button
          variant={"ghost"}
          onClick={onOpen}
          mr={4}
          rightIcon={<HamburgerIcon />}
        >
          tools
        </Button>
        <NavigationDrawer onClose={onClose} isOpen={isOpen} />
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};

export default Navbar;
