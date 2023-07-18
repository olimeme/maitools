import { useState, useEffect, useCallback } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Flex, HStack, Heading } from "@chakra-ui/react";

import KanbanBoard from "../components/Kanban/KanbanBoard";
import BackButton from "../components/BackButton";

const KanbanBoardPage = () => {
  return (
    <MotionWrapper>
      <BackButton />
      <KanbanBoard />
    </MotionWrapper>
  );
};

export default KanbanBoardPage;
