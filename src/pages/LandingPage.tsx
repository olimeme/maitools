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
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MotionWrapper from "../components/MotionWrapper";
import "@fontsource/quicksand/700.css";
import "@fontsource/quicksand/600.css";
import NavCard from "../components/NavCard";
import { landingPageCardItems } from "../data/landingPageCardItems";

const LandingPage = () => {
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
          {landingPageCardItems.map((card, idx) => (
            <NavCard key={idx} card={card} />
          ))}
        </Flex>
      </Container>
    </MotionWrapper>
  );
};

export default LandingPage;
