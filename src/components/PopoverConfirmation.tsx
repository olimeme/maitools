import {
  Box,
  Button,
  ChakraComponent,
  ComponentWithAs,
  Heading,
  IconButtonProps,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverContentProps,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface PopoverConfirmationProps {
  button: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const PopoverConfirmation = ({
  button,
  onConfirm,
  onCancel,
}: PopoverConfirmationProps) => {
  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>{button}</PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                <Text fontSize={"xl"}>
                  Are you sure you want to delete this column?
                </Text>
                <Text color={"gray"} fontSize="sm" mt={2}>
                  All cards inside the column will be lost forever!
                </Text>
              </PopoverBody>
              <PopoverFooter>
                <Button onClick={onConfirm} variant={"solid"} mr={2}>
                  Delete
                </Button>
                <Button onClick={onClose} variant={"ghost"}>
                  Cancel
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default PopoverConfirmation;
