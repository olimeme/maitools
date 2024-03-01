import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
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
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";
import BackButton from "../BackButton";
import { ISpacedRepetitionCard } from "../../interfaces/SpacedRepetition";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import useCommandHistory from "../../hooks/useCommandHistory";
import SpacedRepService from "../../services/SpacedRepService";
import DashboardLoading from "./DashboardLoading";

export interface DeckPageProps {}

const DeckPage = ({}: DeckPageProps) => {
  const [cards, setCards] = useState([] as ISpacedRepetitionCard[]);
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputCardName, setInputCardName] = useState<string>("");
  const [inputCardAnswer, setInputCardAnswer] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const { registerAction } = useCommandHistory();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    //maybe throw a toast here
    if (!id) return;
    fetchCards(id);
  }, []);

  const undoDelete = (
    newCards: ISpacedRepetitionCard[],
    card: ISpacedRepetitionCard,
    id: string
  ) => {
    newCards.splice(
      newCards.findIndex((card) => card._id === id),
      0,
      card
    );
    setCards([...newCards]);
    toast({
      title: "Undone!",
      status: "warning",
      position: "bottom-right",
      isClosable: true,
      duration: 1000,
    });
  };

  const fetchCards = (id: string) => {
    setPageLoading(true);
    SpacedRepService.getAllCards(id)
      .then(({ cards }) => {
        setCards(cards);
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .finally(() => setPageLoading(false));
  };

  const handleCreateCard = () => {
    if (inputCardName === "" || inputCardAnswer === "" || !id) return;
    setLoading(true);
    SpacedRepService.createCard(id, inputCardName, inputCardAnswer)
      .then(({ card, message }) => {
        const newArr = [...cards];
        newArr.push(card);
        setCards(newArr);
        setInputCardName("");
        setInputCardAnswer("");
        if (inputRef.current) {
          inputRef.current.focus();
        }
        toast({
          title: message,
          status: "success",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteCard = (id: string) => {
    setLoading(true);
    SpacedRepService.deleteCard(id)
      .then(({ message }) => {
        const newCards = cards.filter((card) => card._id !== id);
        setCards(newCards);
        toast({
          title: message,
          status: "success",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .finally(() => setLoading(false));
  };

  const handelEditFront = (id: string, nextValue: string) => {
    let card = cards.find((card) => card._id === id);
    if (!card) return;
    if (nextValue === card.front) return;

    setLoading(true);
    SpacedRepService.updateCard(id, nextValue, card.back)
      .then(({ message, card }) => {
        toast({
          title: message,
          status: "success",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
        const newCards = cards.map((c) => (c._id === id ? card : c));
        setCards(newCards);
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditBack = (id: string, nextValue: string) => {
    let card = cards.find((card) => card._id === id);
    if (!card) return;
    if (nextValue === card.back) return;

    setLoading(true);
    SpacedRepService.updateCard(id, card.front, nextValue)
      .then(({ message, card }) => {
        toast({
          title: message,
          status: "success",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
        const newCards = cards.map((c) => (c._id === id ? card : c));
        setCards(newCards);
      })
      .catch((err) => {
        toast({
          title: err,
          status: "error",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (pageLoading) return <DashboardLoading />;

  return (
    <MotionWrapper>
      <ButtonGroup size={"sm"} isDisabled={loading}>
        <BackButton to="/spaced-repetition/" size={"sm"} />
        <Button leftIcon={<AddIcon />} size={"sm"} onClick={onOpen}>
          Add card
        </Button>
      </ButtonGroup>
      <SimpleGrid columns={[1, 2, 2, 4]} gap={4}>
        {cards.map(({ _id, front, back }) => (
          <Card key={_id}>
            <CardHeader>
              <Flex justifyContent={"space-between"}>
                <Box flex={11}>
                  <Editable
                    defaultValue={front || "[No name yet]"}
                    onSubmit={(nextValue) => handelEditFront(_id, nextValue)}
                  >
                    <EditablePreview overflowWrap={"anywhere"} width="full" />
                    <EditableInput placeholder="maybe enter something?" />
                  </Editable>
                </Box>
                <Spacer />
                <Box flex={1}>
                  <IconButton
                    size={"xs"}
                    aria-label="delete"
                    colorScheme="red"
                    isLoading={loading}
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteCard(_id)}
                  />
                </Box>
              </Flex>
            </CardHeader>
            <Divider />
            <CardBody>
              <Editable
                defaultValue={back || "[No answer yet]"}
                onSubmit={(nextValue) => handleEditBack(_id, nextValue)}
              >
                <EditablePreview overflowWrap={"anywhere"} width="full" />
                <EditableInput />
              </Editable>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {!id && (
        <Box color={"grey"} textAlign={"center"} mt={16}>
          <Heading>No cards found</Heading>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"} closeOnEsc>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"sm"}>Front:</Heading>
            <Heading size={"xs"} color={"grey"} my={2}>
              Add a question here
            </Heading>
            <Textarea
              value={inputCardName}
              ref={inputRef}
              required
              onBlur={() => inputRef.current?.focus()}
              onChange={(val) => setInputCardName(val.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateCard();
              }}
            />
            <Heading size={"sm"} mt={4}>
              Back:
            </Heading>
            <Heading size={"xs"} color={"grey"} my={2}>
              You can add an answer here
            </Heading>
            <Textarea
              value={inputCardAnswer}
              required
              onChange={(val) => setInputCardAnswer(val.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateCard();
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreateCard} isLoading={loading}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose} isLoading={loading}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionWrapper>
  );
};

export default DeckPage;
