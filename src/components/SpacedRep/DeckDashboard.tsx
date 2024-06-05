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
import LoadingPage from "../LoadingPage";
import DashboardNoDecks from "./DashboardNoDecks";

interface DeckDashboardProps {
  cards: ISpacedRepetitionDeck[];
  view: DeckViewTypes;
  loading: boolean;
}

const DeckDashboard = ({ cards, view, loading }: DeckDashboardProps) => {
  if (loading && cards.length === 0) return <LoadingPage />;
  else if (cards.length === 0) return <DashboardNoDecks />;
  else
    return (
      <>
        <GalleryView loading={loading} items={cards} />
      </>
    );
};

export default DeckDashboard;
