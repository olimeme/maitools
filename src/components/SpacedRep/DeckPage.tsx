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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";
import BackButton from "../BackButton";
import { ISpacedRepetitionCard } from "../../interfaces/SpacedRepetition";
import useSpacedRepetition from "../../hooks/useSpacedRepetition";
import SpacedRepDeck from "./SpacedRepDeck";
import AnimateBlockPresence from "../AnimateBlockPresence";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import PopoverDeleteButton from "../PopoverDeleteButton";
import useCommandHistory from "../../hooks/useCommandHistory";
import { getInitialStateFromLocalStorage } from "../../helpers/getInitialStateFromLocalStorage";

export interface DeckPageProps {}

const DeckPage = ({}: DeckPageProps) => {
  const [cards, setCards] = useState(
    () =>
      getInitialStateFromLocalStorage(
        "cards",
        [] as Array<ISpacedRepetitionCard>
      ) as Array<ISpacedRepetitionCard>
  );
  const [inputCardName, setInputCardName] = useState<string>("");
  const [inputCardAnswer, setInputCardAnswer] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { registerAction } = useCommandHistory();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(cards));
  }, [cards]);

  const undoDelete = (
    newCards: ISpacedRepetitionCard[],
    card: ISpacedRepetitionCard,
    id: number
  ) => {
    newCards.splice(id - 1, 0, card);
    setCards([...newCards]);
    toast({
      title: "Undone!",
      status: "warning",
      position: "bottom-right",
      isClosable: true,
      duration: 1000,
    });
  };

  const handleCreateCard = () => {
    if (inputCardName === "") {
      return;
    }
    const newArr = [...cards];
    const newCard: ISpacedRepetitionCard = {
      id: cards.length + 1,
      question: inputCardName,
      answer: inputCardAnswer,
      interval: Date.now(),
    };
    newArr.push(newCard);
    setCards(newArr);
    setInputCardName("");
    setInputCardAnswer("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    toast({
      title: "Card added!",
      status: "success",
      position: "bottom-right",
      isClosable: true,
      duration: 1000,
    });
  };

  const handleDeleteCard = (id: number) => {
    const card = cards.find((card) => card.id === id);
    const newCards = cards.filter((card) => card.id !== id);
    registerAction(
      () => setCards(newCards),
      () => {
        if (!card) return;
        undoDelete(newCards, card, id);
      }
    );
    setCards(newCards);
  };

  const handleEditCard = (
    id: number,
    nextValue: string,
    property: "question" | "answer"
  ) => {
    let card = cards.find((card) => card.id === id);
    if (!card) return;
    card[property] = nextValue;
    cards.splice(id - 1, 1, card);
    console.log(cards);
    setCards([...cards]);
  };

  return (
    <MotionWrapper>
      <ButtonGroup size={"sm"}>
        <BackButton to="/spaced-repetition/" size={"sm"} />
        <Button leftIcon={<AddIcon />} size={"sm"} onClick={onOpen}>
          Add card
        </Button>
      </ButtonGroup>
      <Container w={"md"}>
        {cards.map(({ id, question, answer }) => (
          <Card mb={4} key={id}>
            <CardHeader>
              <Flex justifyContent={"space-between"}>
                <Editable
                  defaultValue={question}
                  onSubmit={(nextValue) =>
                    handleEditCard(id, nextValue, "question")
                  }
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <IconButton
                  size={"xs"}
                  aria-label="delete"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteCard(id)}
                />
              </Flex>
            </CardHeader>
            <Divider />
            <CardBody>
              <Editable
                defaultValue={answer}
                onSubmit={(nextValue) =>
                  handleEditCard(id, nextValue, "answer")
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </CardBody>
            {/* <CardFooter>
                <Button>View here</Button>
              </CardFooter> */}
          </Card>
        ))}
        {!id && (
          <Box color={"grey"} textAlign={"center"} mt={16}>
            <Heading>No cards found</Heading>
            <Text>Maybe time to remember something..?</Text>
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
