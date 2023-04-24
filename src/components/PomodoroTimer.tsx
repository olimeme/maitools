import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

interface PomodoroTimerProps {
  workTime: number;
  breakTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workTime,
  breakTime,
}) => {
  const toast = useToast();
  const [timeRemaining, setTimeRemaining] = useState<number>(
    () =>
      getInitialStateFromLocalStorage("timeRemaining", workTime * 60) as number
  );
  const [isWorking, setIsWorking] = useState<boolean>(
    () => getInitialStateFromLocalStorage("isWorking", true) as boolean
  );
  const [isActive, setIsActive] = useState<boolean>(
    () => getInitialStateFromLocalStorage("isActive", false) as boolean
  );
  const timePassed = useRef(
    getInitialStateFromLocalStorage("passedTime", 0) as number
  );

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining === 0) {
          timePassed.current = 0;
          setIsWorking((prevIsWorking) => !prevIsWorking);
          return isWorking ? breakTime * 60 : workTime * 60;
        }
        timePassed.current++;
        return prevTimeRemaining - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, workTime, breakTime]);

  useEffect(() => {
    if (workTime === 0 || breakTime === 0) return;
    const currentTime = isWorking ? workTime : breakTime;
    setTimeRemaining(
      currentTime * 60 - timePassed.current < 0
        ? 0
        : currentTime * 60 - timePassed.current
    );
  }, [isWorking, workTime, breakTime]);

  useEffect(() => {
    localStorage.setItem("timeRemaining", JSON.stringify(timeRemaining));
    localStorage.setItem("passedTime", JSON.stringify(timePassed.current));
    localStorage.setItem("workTime", JSON.stringify(workTime));
    localStorage.setItem("breakTime", JSON.stringify(breakTime));
    localStorage.setItem("isWorking", JSON.stringify(isWorking));
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [timeRemaining, isWorking, isActive]);

  const pauseTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWorking(true);
    setTimeRemaining(workTime * 60);
    timePassed.current = 0;

    localStorage.removeItem("timeRemaining");
    localStorage.removeItem("passedTime");
    localStorage.removeItem("isWorking");
    localStorage.removeItem("isActive");
  };

  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box>
      <Heading as={"h1"} size={"4xl"} textAlign={"center"}>
        {displayTime(timeRemaining)}
      </Heading>
      <Center>
        <HStack mt={8}>
          <Button size={"lg"} onClick={pauseTimer}>
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button size={"lg"} onClick={resetTimer} variant={"ghost"}>
            Reset
          </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default PomodoroTimer;
