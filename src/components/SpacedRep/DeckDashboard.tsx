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

interface DeckDashboardProps {
  //TODO: change to type
  cards: any;
  view: DeckViewTypes;
}

const DeckDashboard = ({ cards, view }: DeckDashboardProps) => {
  return (
    <>
      {cards.length ? (
        view === "list" ? (
          <ListView items={cards} />
        ) : (
          <GalleryView items={cards} />
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
