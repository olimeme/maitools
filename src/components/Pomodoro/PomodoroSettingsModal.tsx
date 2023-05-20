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
import React, { useState, useEffect } from "react";
import { getInitialStateFromLocalStorage } from "../../helpers/getInitialStateFromLocalStorage";
interface PomodoroSettingsProps {
  //TODO: set types
  settings: any;
  onSettingsChange: any;
  modalProps: any;
}
const PomodoroSettingsModal = ({
  modalProps,
  settings,
  onSettingsChange,
}: PomodoroSettingsProps) => {
  const [inputErrors, setInputErrors] = useState({
    workTimeIsInvalid: getInitialStateFromLocalStorage(
      "workTimeInputField",
      false
    ) as boolean,
    breakTimeIsInvalid: getInitialStateFromLocalStorage(
      "breakTimeInputField",
      false
    ) as boolean,
  });

  useEffect(() => {
    onSettingsChange.handleFormValidity(
      !Object.values(inputErrors).some((item) => item)
    );

    localStorage.setItem(
      "workTimeInputField",
      JSON.stringify(inputErrors.workTimeIsInvalid)
    );
    localStorage.setItem(
      "breakTimeInputField",
      JSON.stringify(inputErrors.breakTimeIsInvalid)
    );
  }, [inputErrors]);

  return (
    <Modal
      isOpen={modalProps.isOpen}
      onClose={modalProps.handleCloseModal}
      closeOnEsc={modalProps.closeOnEsc}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Timer settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <FormControl isInvalid={inputErrors.workTimeIsInvalid}>
              <Stack>
                <FormLabel>Work time:</FormLabel>
                <Input
                  variant="filled"
                  placeholder="Work time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onSettingsChange.handleChangeWorkTime(e.target.value);
                    setInputErrors({
                      ...inputErrors,
                      workTimeIsInvalid: e.target.value === "",
                    });
                  }}
                  value={settings.workTime}
                  type="number"
                />
              </Stack>
            </FormControl>
            <FormControl isInvalid={inputErrors.breakTimeIsInvalid}>
              <Stack>
                <FormLabel>Break time:</FormLabel>
                <Input
                  variant="filled"
                  placeholder="Break time"
                  size={"lg"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onSettingsChange.handleChangeBreakTime(e.target.value);
                    setInputErrors({
                      ...inputErrors,
                      breakTimeIsInvalid: e.target.value === "",
                    });
                  }}
                  value={settings.breakTime}
                  type="number"
                />
              </Stack>
            </FormControl>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={modalProps.handleCloseModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PomodoroSettingsModal;
