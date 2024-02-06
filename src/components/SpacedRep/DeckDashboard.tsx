import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { DeckViewTypes } from "../../pages/SpacedRepPage";
import GalleryView from "./GalleryView";
import ListView from "./ListView";
import MotionWrapper from "../MotionWrapper";

interface DeckDashboardProps {
  //TODO: change to type
  cards: any;
  view: DeckViewTypes;
  handleDeleteDeck: (idx: number) => void;
}

const DeckDashboard = ({
  cards,
  view,
  handleDeleteDeck,
}: DeckDashboardProps) => {
  return (
    <>
      {cards.length ? (
        view === "list" ? (
          <ListView items={cards} handleDeleteDeck={handleDeleteDeck} />
        ) : (
          <GalleryView items={cards} handleDeleteDeck={handleDeleteDeck} />
        )
      ) : (
        <Box color={"grey"} textAlign={"center"} mt={16}>
          <Heading>No decks found</Heading>
          <Text>Maybe time to remember something..?</Text>
        </Box>
      )}
    </>
  );
};

export default DeckDashboard;
