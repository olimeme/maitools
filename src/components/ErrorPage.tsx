import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { RiEmotionSadLine } from "react-icons/ri";
import BackButton from "./BackButton";
import MotionWrapper from "./MotionWrapper";

const ErrorPage = ({ message }: { message: string }) => {
  return (
    <MotionWrapper>
      <Box>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"80vh"}
        >
          <Box textAlign={"center"}>
            <Icon as={RiEmotionSadLine} fontSize={"4xl"} />
            <Heading color={"gray"}>{message}</Heading>
          </Box>
        </Flex>
      </Box>
    </MotionWrapper>
  );
};

export default ErrorPage;
