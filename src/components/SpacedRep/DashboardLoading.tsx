import { Box, Center, Flex, Skeleton, Spinner } from "@chakra-ui/react";
import React from "react";

const DashboardLoading = () => {
  return (
    <Box>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"20vh"}
      >
        <Spinner />
      </Flex>
    </Box>
  );
};

export default DashboardLoading;
