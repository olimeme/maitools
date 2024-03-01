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
  Spacer,
  Text,
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
import { useSpacedRepContext } from "../../contexts/SpacedRepContext";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
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
    const card = cards.find((card) => card._id === id);
    const newCards = cards.filter((card) => card._id !== id);
    registerAction(
      () => setCards(newCards),
      () => {
        if (!card) return;
        undoDelete(newCards, card, id);
      }
    );
    setCards(newCards);
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
      <ButtonGroup size={"sm"}>
        <BackButton to="/spaced-repetition/" size={"sm"} />
        <Button leftIcon={<AddIcon />} size={"sm"} onClick={onOpen}>
          Add card
        </Button>
      </ButtonGroup>
      <Container w={"md"}>
        {cards.map(({ _id, front, back }) => (
          <Card mb={4} key={_id}>
            <CardHeader>
              <Flex justifyContent={"space-between"}>
                <Box flex={11}>
                  <Editable
                    defaultValue={front || "[No name yet]"}
                    onSubmit={(nextValue) => handelEditFront(_id, nextValue)}
                  >
                    <EditablePreview
                      fontSize={"xl"}
                      overflowWrap={"anywhere"}
                      width="full"
                    />
                    <EditableInput
                      fontSize={"xl"}
                      placeholder="maybe enter something?"
                    />
                  </Editable>
                </Box>
                <Spacer />
                <Box flex={1}>
                  <IconButton
                    size={"xs"}
                    aria-label="delete"
                    colorScheme="red"
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
                <EditablePreview
                  fontSize={"xl"}
                  overflowWrap={"anywhere"}
                  width="full"
                />
                <EditableInput fontSize={"xl"} />
              </Editable>
            </CardBody>
          </Card>
        ))}
        {!id && (
          <Box color={"grey"} textAlign={"center"} mt={16}>
            <Heading>No cards found</Heading>
          </Box>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"sm"}>Front:</Heading>
            <Heading size={"xs"} color={"grey"} my={2}>
              Add a question here
            </Heading>
            <Input
              type="text"
              value={inputCardName}
              ref={inputRef}
              required
              onChange={(val) => setInputCardName(val.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateCard();
              }}
            />
            <Heading size={"sm"} mt={2}>
              Back:
            </Heading>
            <Heading size={"xs"} color={"grey"} my={2}>
              You can add an answer here
            </Heading>
            <Input
              type="text"
              value={inputCardAnswer}
              onChange={(val) => setInputCardAnswer(val.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateCard();
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreateCard}>
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

export default DeckPage;
