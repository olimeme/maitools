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
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
type CardItem = { heading: string; desc: string; link: string };

const LandingPage = () => {
  const cardItems: CardItem[] = [
    {
      heading: "Markdown",
      desc: "Write down your thoughts and stuff",
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
    <Container maxW="6xl">
      <Center mt={"24"}>
        <Heading size={"2xl"}>maitools</Heading>
      </Center>
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
  );
};

export default LandingPage;
