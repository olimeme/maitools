import {
  Button,
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
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Timer settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Stack>
              <Text>Work time:</Text>
              <Input
                variant="filled"
                placeholder="Work time"
                size={"lg"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSettingsChange.handleChangeWorkTime(
                    parseInt(e.target.value)
                  )
                }
                value={settings.workTime === 0 ? "" : settings.workTime}
                type="number"
              />
            </Stack>
            <Stack>
              <Text>Break time:</Text>
              <Input
                variant="filled"
                placeholder="Break time"
                size={"lg"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSettingsChange.handleChangeBreakTime(
                    parseInt(e.target.value)
                  )
                }
                value={settings.breakTime === 0 ? "" : settings.breakTime}
                type="number"
              />
            </Stack>
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
