import { useToast } from "@chakra-ui/react";
import React from "react";

const useCustomToast = () => {
  const toast = useToast();
  const customToast = (
    title: string,
    description: string | undefined = undefined,
    status: "success" | "error" | "warning" | "info" = "info",
    duration: number = 5000
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: duration,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return customToast;
};

export default useCustomToast;
