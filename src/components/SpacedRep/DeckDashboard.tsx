import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DeckViewTypes } from "../../pages/SpacedRepPage";
import GalleryView from "./GalleryView";
import ListView from "./ListView";
import MotionWrapper from "../MotionWrapper";
import { ISpacedRepetitionDeck } from "../../interfaces/SpacedRepetition/ISpacedRepetitionDeck";
import DashboardLoading from "./DashboardLoading";
import DashboardNoDecks from "./DashboardNoDecks";

interface DeckDashboardProps {
  cards: ISpacedRepetitionDeck[];
  view: DeckViewTypes;
  loading: boolean;
  handleDeleteDeck: (idx: string) => void;
  handleEditDeck: (deckName: string, id: string) => void;
}

const DeckDashboard = ({
  cards,
  view,
  loading,
  handleDeleteDeck,
  handleEditDeck,
}: DeckDashboardProps) => {
  if (loading && cards.length === 0) return <DashboardLoading />;
  else if (cards.length === 0) return <DashboardNoDecks />;
  else
    return (
      <>
        {cards.length &&
          (view === "list" ? (
            <ListView items={cards} handleDeleteDeck={handleDeleteDeck} />
          ) : (
            <GalleryView
              loading={loading}
              items={cards}
              handleDeleteDeck={handleDeleteDeck}
              handleEditDeck={handleEditDeck}
            />
          ))}
      </>
    );
};

export default DeckDashboard;
