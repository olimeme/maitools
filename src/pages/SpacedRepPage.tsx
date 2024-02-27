import React, { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import DeckDashboard from "../components/SpacedRep/DeckDashboard";
import { AddIcon } from "@chakra-ui/icons";
import { getInitialStateFromLocalStorage } from "../helpers/getInitialStateFromLocalStorage";
import CheckAuth from "./CheckAuth";
import SpacedRepService from "../services/SpacedRepService";
import { ISpacedRepetitionDeck } from "../interfaces/SpacedRepetition/ISpacedRepetitionDeck";
import useCustomToast from "../hooks/useCustomToast";
import { redirect } from "react-router-dom";
import { SpacedRepContext } from "../contexts/SpacedRepContext";

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
        customToast(err, "", "error");
        return redirect("/login");
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

  const handleDeleteDeck = (deckId: string) => {
    setLoading(true);
    SpacedRepService.deleteDeck(deckId)
      .then(({ message }) => {
        customToast(message, "", "warning");
        const filteredDeck = deckList.filter((deck) => deck._id !== deckId);
        setDeckList(filteredDeck);
        onClose();
      })
      .catch((err) => {
        customToast(err, "", "error");
      })
      .finally(() => {
        setLoading(false);
        setInputDeckName("");
      });
  };

  const handleEditDeck = (deckName: string, id: string) => {
    const curName = deckList.find((deck) => deck._id === id)?.deckName;
    if (deckName === curName) return;
    setLoading(true);
    SpacedRepService.editDeck(id, deckName)
      .then(({ message }) => {
        customToast(message, "", "success");
      })
      .catch((err) => {
        customToast(err, "", "error");
      })
      .finally(() => {
        setLoading(false);
        setInputDeckName("");
      });
  };

  return (
    <MotionWrapper>
      <CheckAuth>
        <SpacedRepContext.Provider
          value={{
            handleDeleteDeck: handleDeleteDeck,
            handleEditDeck: handleEditDeck,
            // handleCreateCard: handleCreateCard,
            // handleDeleteCards: handleDeleteCards,
            // handleEditCards: handleEditCards,
          }}
        >
          <ButtonGroup size={"sm"}>
            <Button
              leftIcon={<AddIcon />}
              size={"sm"}
              onClick={onOpen}
              isLoading={loading}
            >
              Add deck
            </Button>
          </ButtonGroup>
          <DeckDashboard
            cards={deckList}
            loading={loading}
            view={currentDeckView}
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
        </SpacedRepContext.Provider>
      </CheckAuth>
    </MotionWrapper>
  );
};

export default SpacedRepPage;
