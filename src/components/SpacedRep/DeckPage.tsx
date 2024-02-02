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
} from "@chakra-ui/react";
import React from "react";
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

export interface DeckPageProps {}

const initialCards: ISpacedRepetitionCard[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    interval: Date.now(),
  },
  { id: 2, question: "What is 2 + 2?", answer: "4", interval: Date.now() },
  // Add more cards as needed
];

const DeckPage = ({}: DeckPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleDeleteCard = (id: number) => {
    console.log("Deleting card with id: ", id);
  };

  return (
    <MotionWrapper>
      <BackButton to="/spaced-repetition/" />
      <Container w={"xl"}>
        {id ? (
          <AnimateBlockPresence>
            {initialCards.map(({ id, question, answer }) => (
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
                    <PopoverDeleteButton
                      handleDelete={() => {
                        console.log("Deleting card with id: ", id);
                        handleDeleteCard(id);
                        onClose();
                      }}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
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
          </AnimateBlockPresence>
        ) : (
          <Box color={"grey"} textAlign={"center"} mt={16}>
            <Heading>No decks found</Heading>
            <Text>Maybe time to remember something..?</Text>
          </Box>
        )}
      </Container>
    </MotionWrapper>
  );
};

export default DeckPage;
