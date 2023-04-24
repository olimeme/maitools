import React, { useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Center, Container, Heading } from "@chakra-ui/react";
import PomodoroTimer from "../components/PomodoroTimer";

const PomodoroTimerPage = () => {
  return (
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Pomodoro timer
      </Heading>
      <Container maxW={"4xl"} pt={24}>
        <Center>
          <PomodoroTimer />
        </Center>
      </Container>
    </MotionWrapper>
  );
};

export default PomodoroTimerPage;
