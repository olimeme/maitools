import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";
import { FaUndo } from "react-icons/fa";
import { HiPause, HiPlay, HiCog6Tooth } from "react-icons/hi2";
import PomodoroSerttingsModal from "./PomodoroSerttingsModal";

const PomodoroTimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [workTime, setWorkTime] = useState<number>(
    () => getInitialStateFromLocalStorage("workTime", 25) as number
  );
  const [breakTime, setBreakTime] = useState<number>(
    () => getInitialStateFromLocalStorage("breakTime", 5) as number
  );
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
          setIsWorking((prevIsWorking) => {
            toast({
              title: prevIsWorking ? "Break time!" : "Work time!",
              description: prevIsWorking
                ? "Go recharge you batteries!"
                : "Time to give it your 100%!",
              status: "success",
              duration: 4000,
              isClosable: true,
              variant: "subtle",
              position: "bottom-right",
            });
            return !prevIsWorking;
          });
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

  const handleChangeWorkTime = (timeInMinutes: number) => {
    setWorkTime(timeInMinutes);
  };

  const handleChangeBreakTime = (timeInMinutes: number) => {
    setBreakTime(timeInMinutes);
  };

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
      <Heading
        as={"h1"}
        size={"4xl"}
        textAlign={"center"}
        fontSize={"9xl"}
        opacity={0.3}
      >
        {displayTime(timeRemaining)}
      </Heading>
      <Center>
        <HStack mt={8} spacing={"6"}>
          <Button
            size={"lg"}
            onClick={pauseTimer}
            rightIcon={isActive ? <HiPause /> : <HiPlay />}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <IconButton
            size={"lg"}
            aria-label="retry"
            icon={<FaUndo />}
            variant={"ghost"}
            onClick={resetTimer}
          />
          <IconButton
            size={"lg"}
            aria-label="settings"
            icon={<HiCog6Tooth />}
            variant={"ghost"}
            onClick={onOpen}
          />
        </HStack>
      </Center>
      <PomodoroSerttingsModal
        modalProps={{
          isOpen,
          onClose,
          closeOnEsc: true,
        }}
        settings={{
          workTime,
          breakTime,
        }}
        onSettingsChange={{
          handleChangeWorkTime,
          handleChangeBreakTime,
        }}
      />
    </Box>
  );
};

export default PomodoroTimer;
