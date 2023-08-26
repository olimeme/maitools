import { useContext, useEffect, useRef, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PomodoroTimerContext } from "../contexts/PomodoroTimerContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavigationDrawer from "./Drawer/NavigationDrawer";
import useNavbarLoginStatus from "../hooks/useNavbarLoginStatus";
const Navbar = () => {
  const {
    data: { displayTimeRemaining, isPomodoroPageOpen, isActive },
  } = useContext(PomodoroTimerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout } = useNavbarLoginStatus();

  return (
    <Flex gap={4} p={4}>
      <Box>
        <Link to={"/"}>
          <Button variant="ghost">maitools</Button>
        </Link>
      </Box>
      <Spacer />
      {!isPomodoroPageOpen && isActive && (
        <Tooltip label={"Pomodoro timer"} fontSize={"md"}>
          <Box>
            <Link to={"/pomodoro-timer"}>
              <Button variant={"ghost"}>
                <Text>{displayTimeRemaining}</Text>
              </Button>
            </Link>
          </Box>
        </Tooltip>
      )}
      <Box>
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
      <Box>
        {isLoggedIn ? (
          <Button variant={"ghost"} onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Link to={"/login"}>
            <Button variant={"ghost"}>Login</Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
