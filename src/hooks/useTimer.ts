import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

type PomodoroTimerStatus = "work" | "break";

export const useTimer = () => {
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
              position: "bottom",
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
    setTimeRemaining(isWorking ? workTime * 60 : breakTime * 60);
    timePassed.current = 0;

    localStorage.removeItem("timeRemaining");
    localStorage.removeItem("passedTime");
    localStorage.removeItem("isWorking");
    localStorage.removeItem("isActive");
  };

  const handleChangeTimerStatus = (status: PomodoroTimerStatus) => {
    setIsWorking(status === "work");
    setIsActive(false);
    setTimeRemaining(status === "work" ? workTime * 60 : breakTime * 60);
    timePassed.current = 0;
  };

  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    data: {
      displayTimeRemaining: displayTime(timeRemaining),
      timeRemaining,
      workTime,
      breakTime,
      isActive,
      isWorking,
    },
    notificationToast: {
      isOpen,
      onOpen,
      onClose,
    },
    handlers: {
      pauseTimer,
      resetTimer,
      handleChangeBreakTime,
      handleChangeWorkTime,
      handleChangeTimerStatus,
    },
  };
};
