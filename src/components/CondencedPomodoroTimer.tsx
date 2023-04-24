import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface CondencedPomodoroProps {
  currentTime: number;
}

const CondencedPomodoroTimer = ({ currentTime }: CondencedPomodoroProps) => {
  const displayTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box>
      <Text>{displayTime(currentTime)}</Text>
    </Box>
  );
};

export default CondencedPomodoroTimer;
