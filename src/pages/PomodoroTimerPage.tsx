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
  Text,
  VStack,
} from "@chakra-ui/react";
import PomodoroTimer from "../components/PomodoroTimer";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

const PomodoroTimerPage = () => {
  const [workTime, setWorkTime] = useState<number>(
    () => getInitialStateFromLocalStorage("workTime", 25) as number
  );
  const [breakTime, setBreakTime] = useState<number>(
    () => getInitialStateFromLocalStorage("breakTime", 5) as number
  );

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
                <Text>Work time:</Text>
                <Input
                  variant="filled"
                  placeholder="Work time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWorkTime(+e.target.value)
                  }
                  value={workTime === 0 ? "" : workTime}
                  type="number"
                />
                <Text pt={8}>Break time:</Text>
                <Input
                  variant="filled"
                  placeholder="Break time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBreakTime(+e.target.value)
                  }
                  value={breakTime === 0 ? "" : breakTime}
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
