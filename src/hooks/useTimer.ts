import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";
import { useLocation } from "react-router";

type PomodoroTimerStatus = "work" | "break";

export const useTimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const location = useLocation();
  const [workTime, setWorkTime] = useState<number>(
    () => getInitialStateFromLocalStorage("workTime", 20) as number
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
  const [isFormValid, setIsFormValid] = useState(
    () => getInitialStateFromLocalStorage("isFormValid", true) as boolean
  );
  const [isPomodoroPageOpen, setIsPomodoroPageOpen] = useState(false);

  useEffect(() => {
    setIsPomodoroPageOpen(location.pathname === "/pomodoro-timer");
    return () => setIsPomodoroPageOpen(false);
  }, [location]);

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
              status: "info",
              duration: 4000,
              isClosable: true,
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
    localStorage.setItem("workTime", JSON.stringify(timeInMinutes));
    setWorkTime(timeInMinutes);
  };

  const handleChangeBreakTime = (timeInMinutes: number) => {
    localStorage.setItem("breakTime", JSON.stringify(timeInMinutes));
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

  const handleFormValidity = (isValid: boolean) => {
    localStorage.setItem("isFormValid", JSON.stringify(isValid));
    setIsFormValid(isValid);
  };

  const handleCloseModal = () => {
    if (isFormValid) onClose();
  };

  return {
    data: {
      displayTimeRemaining: displayTime(timeRemaining),
      timeRemaining,
      workTime,
      breakTime,
      isActive,
      isWorking,
      isPomodoroPageOpen,
    },
    notificationToast: {
      isOpen,
      onOpen,
      handleCloseModal,
    },
    handlers: {
      pauseTimer,
      resetTimer,
      handleChangeBreakTime,
      handleChangeWorkTime,
      handleChangeTimerStatus,
      handleFormValidity,
    },
  };
};
