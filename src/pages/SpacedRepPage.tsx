import React, { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Button,
  ButtonGroup,
  Heading,
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
import AuthService from "../services/AuthService";
import CheckAuth from "./CheckAuth";
import SpacedRepService from "../services/SpacedRepService";
import { ISpacedRepetitionDeck } from "../interfaces/SpacedRepetition/ISpacedRepetitionDeck";
import useCustomToast from "../hooks/useCustomToast";

export type DeckViewTypes = "list" | "gallery";

const SpacedRepPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckList, setDeckList] = useState<Array<ISpacedRepetitionDeck>>([]);
  const customToast = useCustomToast();
  const [currentDeckView, setCurrentDeckView] = useState<DeckViewTypes>(
    () =>
      getInitialStateFromLocalStorage(
        "currentDeckView",
        "gallery"
      ) as DeckViewTypes
  );
  const [inputDeckName, setInputDeckName] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleFetchDeckList();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentDeckView", JSON.stringify(currentDeckView));
  }, [currentDeckView]);

  const handleFetchDeckList = () => {
    setLoading(true);
    SpacedRepService.getDeckList()
      .then(({ decks }) => {
        setDeckList(decks);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateDeck = () => {
    if (inputDeckName === "") {
      return;
    }
    setLoading(true);
    SpacedRepService.createDeck(inputDeckName)
      .then(({ deck, message }) => {
        const newArr = [...deckList, deck];
        setDeckList(newArr);
        onClose();
        customToast(message, "", "success");
      })
      .catch((err) => {
        customToast(err, "", "error");
      })
      .finally(() => {
        handleFetchDeckList();
        setLoading(false);
        setInputDeckName("");
      });
  };

  const handleDeleteDeck = (idx: string) => {
    setLoading(true);
    SpacedRepService.deleteDeck(idx)
      .then(({ message }) => {
        customToast(message, "", "warning");
        onClose();
      })
      .catch((err) => {
        customToast(err, "", "error");
      })
      .finally(() => {
        handleFetchDeckList();
        setLoading(false);
        setInputDeckName("");
      });
  };

  return (
    <MotionWrapper>
      <CheckAuth>
        <ButtonGroup size={"sm"}>
          <Button
            leftIcon={<AddIcon />}
            size={"sm"}
            onClick={onOpen}
            isLoading={loading}
          >
            Add deck
          </Button>
          {/* <ButtonGroup isAttached size={"sm"}>
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
        </ButtonGroup> */}
        </ButtonGroup>
        <DeckDashboard
          cards={deckList}
          view={currentDeckView}
          handleDeleteDeck={handleDeleteDeck}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add deck</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size={"sm"}>Deck name:</Heading>
              <Heading size={"xs"} color={"grey"} my={2}>
                This is where your cards are going to be stored.
              </Heading>
              <Input
                type="text"
                value={inputDeckName}
                autoFocus
                onChange={(val) => setInputDeckName(val.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateDeck();
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Button isLoading={loading} mr={3} onClick={handleCreateDeck}>
                Add
              </Button>
              <Button isLoading={loading} variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CheckAuth>
    </MotionWrapper>
  );
};

export default SpacedRepPage;
