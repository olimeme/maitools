import React, { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DeckDashboard from "../components/SpacedRep/DeckDashboard";
import { AddIcon } from "@chakra-ui/icons";
import { BsListUl } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";

export type DeckViewTypes = "list" | "gallery";

const SpacedRepPage = () => {
  const [deckList, setDeckList] = useState<Array<any>>(
    () => getInitialStateFromLocalStorage("deckList", []) as Array<any>
  );
  const [currentDeckView, setCurrentDeckView] = useState<DeckViewTypes>(
    () =>
      getInitialStateFromLocalStorage(
        "currentDeckView",
        "list"
      ) as DeckViewTypes
  );
  const [inputDeckName, setInputDeckName] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    localStorage.setItem("deckList", JSON.stringify(deckList));
  }, [deckList]);

  useEffect(() => {
    localStorage.setItem("currentDeckView", JSON.stringify(currentDeckView));
  }, [currentDeckView]);

  const handleCreateDeck = () => {
    if (inputDeckName === "") {
      return;
    }
    const newArr = [...deckList];
    newArr.push({ name: inputDeckName, cards: [] });
    setDeckList(newArr);
    setInputDeckName("");
    onClose();
  };

  return (
    <MotionWrapper>
      <ButtonGroup size={"sm"}>
        <Button
          leftIcon={<AddIcon />}
          variant={"ghost"}
          size={"sm"}
          onClick={onOpen}
        >
          Add deck
        </Button>
        <ButtonGroup isAttached size={"sm"}>
          <IconButton
            icon={<BsListUl />}
            aria-label="list view"
            variant={currentDeckView === "list" ? "solid" : "ghost"}
            onClick={() => {
              setCurrentDeckView("list");
            }}
          ></IconButton>
          <IconButton
            icon={<RxDashboard />}
            aria-label="gallery view"
            variant={currentDeckView === "gallery" ? "solid" : "ghost"}
            onClick={() => {
              setCurrentDeckView("gallery");
            }}
          ></IconButton>
        </ButtonGroup>
        <Button
          onClick={() => {
            setDeckList([]);
            localStorage.removeItem("deckList");
            localStorage.removeItem("currentDeckView");
          }}
        >
          clear
        </Button>
      </ButtonGroup>
      <DeckDashboard cards={deckList} view={currentDeckView} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add deck</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deck name:</Text>
            <Input
              type="text"
              value={inputDeckName}
              onChange={(val) => setInputDeckName(val.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreateDeck}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionWrapper>
  );
};

export default SpacedRepPage;
