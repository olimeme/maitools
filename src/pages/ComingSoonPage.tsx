import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Center, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { RiEmotionSadLine } from "react-icons/ri";

const ComingSoonPage = () => {
  return (
    <MotionWrapper>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width="100%"
        height="60vh"
      >
        <Box textAlign={"center"}>
          <Icon as={RiEmotionSadLine} fontSize={"4xl"} />
          <Heading>This is page is not ready yet!</Heading>
          <Text color={"gray"} mt={4}>
            Dev is probably working on it...or sleeping.
          </Text>
        </Box>
      </Flex>
    </MotionWrapper>
  );
};

export default ComingSoonPage;
