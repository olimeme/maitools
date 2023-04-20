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

type CardItem = { heading: string; desc: string; link: string };

const LandingPage = () => {
  const cardItems: CardItem[] = [
    {
      heading: "Markdown",
      desc: "Write stuff... like a programmer.",
      link: "/markdown",
    },
    {
      heading: "Pomodoro Timer",
      desc: "Focus, focus, focus...",
      link: "/pomodoro-timer",
    },
    {
      heading: "Whiteboard",
      desc: "Let's work together!",
      link: "/whiteboard",
    },
    {
      heading: "Todo list",
      desc: "Todotodotodotodoooooo",
      link: "/todo-list",
    },
    {
      heading: "Kanban board",
      desc: "Plan, start, progress, finish, organize.",
      link: "/todo-list",
    },
  ];

  return (
    <MotionWrapper>
      <Container maxW="6xl">
        <Stack>
          <Center mt={"24"}>
            <Heading size={"3xl"}>maitools</Heading>
          </Center>
          <Center mt={"24"}>
            <Heading size={"md"} color={"gray"}>
              all essential academic productivity tools
            </Heading>
          </Center>
        </Stack>
        <Flex
          justify={"center"}
          alignItems="stretch"
          gap="6"
          wrap={"wrap"}
          mt={"36"}
        >
          {cardItems.map((card, idx) => (
            <Box key={idx} flexGrow={1} width={"auto"}>
              <Link to={card.link}>
                <Card>
                  <CardBody>
                    <Heading>{card.heading}</Heading>
                    <Text color={"gray"}>{card.desc}</Text>
                  </CardBody>
                  <CardFooter>
                    <Link to={card.link}>
                      <Button rightIcon={<ChevronRightIcon />}>
                        Go to {card.heading}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </Link>
            </Box>
          ))}
        </Flex>
      </Container>
    </MotionWrapper>
  );
};

export default LandingPage;
