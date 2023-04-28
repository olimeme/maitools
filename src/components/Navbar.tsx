import { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { PomodoroTimerContext } from "../contexts/PomodoroTimerContext";
const Navbar = () => {
  const {
    data: { displayTimeRemaining, isPomodoroPageOpen, isActive },
  } = useContext(PomodoroTimerContext);
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
      <Box p="4" gap={4}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant={"ghost"}
          >
            tools
          </MenuButton>
          <MenuList>
            <Link to={"/markdown"}>
              <MenuItem>Markdown</MenuItem>
            </Link>
            <Link to={"/pomodoro-timer"}>
              <MenuItem>Pomodoro Timer</MenuItem>
            </Link>

            <Link to={"/whiteboard"}>
              <MenuItem>Whiteboard</MenuItem>
            </Link>

            <Link to={"/todo-list"}>
              <MenuItem>Todo List</MenuItem>
            </Link>
          </MenuList>
        </Menu>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};

export default Navbar;
