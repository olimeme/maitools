import { Box, Center, Flex, Skeleton, Spinner } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "./MotionWrapper";

const LoadingPage = () => {
  return (
    <MotionWrapper>
      <Box>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"80vh"}
        >
          <Spinner />
        </Flex>
      </Box>
    </MotionWrapper>
  );
};

export default LoadingPage;
