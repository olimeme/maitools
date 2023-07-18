import { useState, useEffect, useCallback } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Flex, HStack, Heading } from "@chakra-ui/react";

import KanbanBoard from "../components/Kanban/KanbanBoard";

const KanbanBoardPage = () => {
  return (
    <MotionWrapper>
      <Heading mb={4} textAlign={"center"}>
        Kanban board
      </Heading>
      <KanbanBoard />
    </MotionWrapper>
  );
};

export default KanbanBoardPage;
