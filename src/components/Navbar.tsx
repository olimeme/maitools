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
import React from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  return (
    <Flex>
      <Box p="4">
        <Button variant="ghost">mintools</Button>
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
            <MenuItem>Markdown</MenuItem>
            <MenuItem>Pomodoro Timer</MenuItem>
            <MenuItem>Whiteboard</MenuItem>
            <MenuItem>Todo list</MenuItem>
          </MenuList>
        </Menu>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};

export default Navbar;
