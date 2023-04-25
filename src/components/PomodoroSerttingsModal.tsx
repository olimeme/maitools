import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  UseModalProps,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
interface PomodoroSettingsProps {
  //TODO: set types
  settings: any;
  onSettingsChange: any;
  modalProps: UseModalProps;
}
const PomodoroSerttingsModal = ({
  modalProps,
  settings,
  onSettingsChange,
}: PomodoroSettingsProps) => {
  const [input, setInput] = useState("");

  const isError = input === "";

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Timer settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <FormControl isInvalid={isError}>
              <Stack>
                <FormLabel>Work time:</FormLabel>
                <Input
                  variant="filled"
                  placeholder="Work time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onSettingsChange.handleChangeWorkTime(e.target.value);
                    setInput(e.target.value);
                  }}
                  value={settings.workTime}
                  type="number"
                />
              </Stack>
            </FormControl>
            <FormControl isInvalid={isError}>
              <Stack>
                <FormLabel>Break time:</FormLabel>
                <Input
                  variant="filled"
                  placeholder="Break time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSettingsChange.handleChangeBreakTime(e.target.value)
                  }
                  value={settings.breakTime}
                  type="number"
                />
              </Stack>
            </FormControl>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={modalProps.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PomodoroSerttingsModal;
