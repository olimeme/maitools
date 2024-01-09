import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Canvas } from "../components/Whiteboard";

const WhiteboardPage = () => {
  return (
    <MotionWrapper noPadding>
      <Canvas />
    </MotionWrapper>
  );
};

export default WhiteboardPage;
