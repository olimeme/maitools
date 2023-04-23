import React, { useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import PomodoroTimer from "../components/PomodoroTimer";

const PomodoroTimerPage = () => {
  const [workTime, setWorkTime] = useState<number>(25);
  const [breakTime, setBreakTime] = useState<number>(5);

  return (
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Pomodoro timer
      </Heading>
      <Container maxW={"4xl"} pt={24}>
        <Flex wrap={"wrap-reverse"}>
          <Box flex={1}>
            <Center>
              <VStack>
                <Input
                  variant="filled"
                  placeholder="Work time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWorkTime(+e.target.value)
                  }
                  value={workTime}
                  type="number"
                />
                <Input
                  variant="filled"
                  placeholder="Break time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBreakTime(+e.target.value)
                  }
                  value={breakTime}
                  type="number"
                />
              </VStack>
            </Center>
          </Box>
          <Box flex={1}>
            <PomodoroTimer workTime={workTime} breakTime={breakTime} />
          </Box>
        </Flex>
      </Container>
    </MotionWrapper>
  );
};

export default PomodoroTimerPage;
