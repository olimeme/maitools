import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import PomodoroTimer from "../components/PomodoroTimer";

const PomodoroTimerPage = () => {
  return (
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Pomodoro timer
      </Heading>
      <PomodoroTimer workTime={1} breakTime={5} />
    </MotionWrapper>
  );
};

export default PomodoroTimerPage;
