import React, { useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Button, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { BsCloudRainHeavy } from "react-icons/bs";
import { PomodoroTimer } from "../components/Pomodoro";
import useAudioPlayer from "../hooks/useAudioPlayer";

const PomodoroTimerPage = () => {
  // const [playing, toggle] = useAudioPlayer({
  //   src: "../../rain.mp3",
  // });

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
      {/* <Center>
        <Flex align="center" justify="center" pos="fixed" bottom="0" pb={4}>
          <Button
            bg={playing ? "teal.600" : ""}
            style={{ margin: "0 auto" }}
            rightIcon={<BsCloudRainHeavy />}
            onClick={() => toggle()}
          >
            rain sound
          </Button>
        </Flex>
      </Center> */}
    </MotionWrapper>
  );
};

export default PomodoroTimerPage;
