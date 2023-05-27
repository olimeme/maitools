import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MotionWrapper from "../components/MotionWrapper";
import "@fontsource/quicksand/700.css";
import "@fontsource/quicksand/600.css";
import { TCardItem } from "../interfaces/TCardItem";
import NavCard from "../components/NavCard";

const LandingPage = () => {
  const cardItems: TCardItem[] = [
    {
      heading: "Markdown",
      desc: "good for note-taking",
      link: "/markdown",
    },
    {
      heading: "Pomodoro Timer",
      desc: "focus using a tomato method",
      link: "/pomodoro-timer",
    },
    {
      heading: "Whiteboard",
      desc: "work together",
      link: "/whiteboard",
    },
    {
      heading: "To do list",
      desc: "get stuff done",
      link: "/todo-list",
    },
    {
      heading: "Kanban board",
      desc: "plan, start, progress, finish, organize.",
      link: "/kanban",
    },
  ];

  return (
    <MotionWrapper>
      <Container maxW="6xl">
        <Stack>
          <Center mt={"24"}>
            <Heading size={"3xl"}>maitools</Heading>
          </Center>
          <Heading size={"md"} color={"gray"} textAlign={"center"}>
            all essential academic productivity tools
          </Heading>
        </Stack>
        <Flex
          justify={"center"}
          alignItems="stretch"
          gap="6"
          wrap={"wrap"}
          mt={"36"}
        >
          {cardItems.map((card, idx) => (
            <NavCard key={idx} card={card} />
          ))}
        </Flex>
      </Container>
    </MotionWrapper>
  );
};

export default LandingPage;
