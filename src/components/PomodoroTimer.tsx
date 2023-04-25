import { useContext } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FaUndo } from "react-icons/fa";
import { HiPause, HiPlay, HiCog6Tooth } from "react-icons/hi2";
import PomodoroSerttingsModal from "./PomodoroSerttingsModal";
import { PomodoroTimerContext, PomodoroTimerHook } from "../App";

const PomodoroTimer = () => {
  const {
    data: { displayTimeRemaining, workTime, breakTime, isActive },
    handlers: {
      pauseTimer,
      resetTimer,
      handleChangeBreakTime,
      handleChangeWorkTime,
    },
    notificationToast: { onOpen, isOpen, onClose },
  } = useContext(PomodoroTimerContext);
  return (
    <Box>
      <Heading
        as={"h1"}
        size={"4xl"}
        textAlign={"center"}
        fontSize={"9xl"}
        opacity={0.3}
      >
        {displayTimeRemaining}
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
