import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface ToastComponentProps {
  title: string;
  description: string;
}

const ToastComponent = ({ title, description }: ToastComponentProps) => {
  return (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ToastComponent;
