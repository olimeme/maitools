import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Heading } from "@chakra-ui/react";

const KanbanBoardPage = () => {
  return (
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Kanban board
      </Heading>
    </MotionWrapper>
  );
};

export default KanbanBoardPage;
