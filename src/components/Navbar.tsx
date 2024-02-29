import { useContext, useEffect, useRef, useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdDashboard,
  MdOutlineViewKanban,
  MdTimer,
  MdList,
  MdRepeat,
} from "react-icons/md";
import { DarkModeSwitch } from "./DarkMode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PomodoroTimerContext } from "../contexts/PomodoroTimerContext";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavigationDrawer from "./Drawer/NavigationDrawer";
import useNavbarLoginStatus from "../hooks/useNavbarLoginStatus";
import { TDrawerItemType } from "../data/drawerItems";
import { FaMarkdown } from "react-icons/fa";
const Navbar = () => {
  const {
    data: { displayTimeRemaining, isPomodoroPageOpen, isActive },
  } = useContext(PomodoroTimerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout } = useNavbarLoginStatus();

  const drawerItems: TDrawerItemType[] = [
    {
      id: 1,
      icon: <FaMarkdown />,
      link: "/markdown",
      name: "Markdown",
    },
    {
      id: 2,
      icon: <MdTimer />,
      link: "/pomodoro-timer",
      name: "Pomodoro timer",
    },
    // {
    //   id: 3,
    //   link: "/whiteboard",
    //   name: "Whiteboard",
    // },
    {
      id: 4,
      icon: <MdList />,
      link: "/todo-list",
      name: "To do list",
    },
    {
      id: 5,
      icon: <MdOutlineViewKanban />,
      link: "/kanban",
      name: "Kanban board",
    },
    {
      id: 6,
      icon: <MdRepeat />,
      link: "/spaced-repetition",
      name: "Spaced repetition",
    },
  ];

  return (
    <Flex pos={"absolute"} zIndex={1} w={"100%"} p={4} gap={4}>
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
        {/* <Button
          variant={"ghost"}
          onClick={onOpen}
          rightIcon={<HamburgerIcon />}
        >
          tools
        </Button> */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant={"ghost"}
          >
            Tools
          </MenuButton>
          <MenuList>
            {drawerItems.map((item) => (
              <Link to={item.link} key={item.id}>
                <MenuItem>
                  {item.icon}
                  <Text ml={2}>{item.name}</Text>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
        <NavigationDrawer onClose={onClose} isOpen={isOpen} />
      </Box>
      <DarkModeSwitch />
      <Box>
        {isLoggedIn ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
