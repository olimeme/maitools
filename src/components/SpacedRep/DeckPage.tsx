import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
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
import React, { useEffect, useState } from "react";
import { useNavigation, useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";
import BackButton from "../BackButton";
import { ISpacedRepetitionCard } from "../../interfaces/SpacedRepetition";
import useSpacedRepetition from "../../hooks/useSpacedRepetition";
import SpacedRepDeck from "./SpacedRepDeck";
import AnimateBlockPresence from "../AnimateBlockPresence";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import PopoverDeleteButton from "../PopoverDeleteButton";
import useCommandHistory from "../../hooks/useCommandHistory";

export interface DeckPageProps {}

const initialCards: ISpacedRepetitionCard[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    interval: Date.now(),
  },
  { id: 2, question: "What is 2 + 2?", answer: "4", interval: Date.now() },
  { id: 3, question: "What is 3 + 3?", answer: "6", interval: Date.now() },
  // Add more cards as needed
];

const DeckPage = ({}: DeckPageProps) => {
  const [cards, setCards] = useState(initialCards);
  const { id } = useParams<{ id: string }>();
  const { registerAction } = useCommandHistory();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

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

  return (
    <MotionWrapper>
      <BackButton to="/spaced-repetition/" />
      <Container w={"xl"}>
        {cards.map(({ id, question, answer }) => (
          <Card mb={4} key={id}>
            <CardHeader>
              <Flex justifyContent={"space-between"}>
                <Heading size="md">{question}</Heading>
                <IconButton
                  aria-label="edit"
                  size={"xs"}
                  mr={2}
                  ml={"auto"}
                  icon={<EditIcon />}
                >
                  Edit
                </IconButton>
                {/* I have no idea why popover is not working */}
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
              <Text>{answer}</Text>
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
    </MotionWrapper>
  );
};

export default DeckPage;
