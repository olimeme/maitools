import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

interface PomodoroTimerProps {
  workTime: number;
  breakTime: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  workTime,
  breakTime,
}) => {
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

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining === 0) {
          setIsWorking((prevIsWorking) => !prevIsWorking);
          return isWorking ? breakTime * 60 : workTime * 60;
        }

        return prevTimeRemaining - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, workTime, breakTime]);

  useEffect(() => {
    localStorage.setItem("timeRemaining", JSON.stringify(timeRemaining));
    localStorage.setItem("isWorking", JSON.stringify(isWorking));
    localStorage.setItem("isActive", JSON.stringify(isActive));
  }, [timeRemaining, isWorking, isActive]);

  const toggleActive = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWorking(true);
    setTimeRemaining(workTime * 60);
    localStorage.removeItem("timeRemaining");
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
      <Text fontSize="2xl">{isWorking ? "Work Time" : "Break Time"}</Text>
      <Box>
        <CircularProgress
          value={
            100 -
            (timeRemaining / (isWorking ? workTime : breakTime) / 60) * 100
          }
          size="120px"
          thickness="10px"
          capIsRound
        >
          <CircularProgressLabel>
            {displayTime(timeRemaining)}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <HStack mt={8}>
        <Button onClick={toggleActive}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer} variant={"ghost"}>
          Reset
        </Button>
      </HStack>
    </Box>
  );
};

export default PomodoroTimer;