import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Flex>
      <Box p="4">
        <Link to={"/"}>
          <Button variant="ghost">maitools</Button>
        </Link>
      </Box>
      <Spacer />
      <Box p="4">
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
