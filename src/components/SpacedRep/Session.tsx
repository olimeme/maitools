import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import MotionWrapper from "../MotionWrapper";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import SpacedRepService from "../../services/SpacedRepService";
import BackButton from "../BackButton";
import { withClick } from "./withClick";
import CardComponent, { CardComponentProps } from "./Card";

const Card = withClick<CardComponentProps & { width: string; height: string }>(
  CardComponent
);

const Session = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cards, setCards] = useState([] as any[]); // [front, back, id
  const { id } = useParams<{ id: string }>();
  const { front, back } = getRandomCard();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCards(id);
  }, []);

  function fetchCards(id: string) {
    setLoading(true);
    SpacedRepService.getAllCards(id)
      .then((res) => {
        setCards(res.cards);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }

  function getRandomCard() {
    if (cards.length === 0) return { front: "", back: "" };
    const card = cards[Math.floor(Math.random() * cards.length)];
    return { front: card.front, back: card.back };
  }

  if (loading) return <LoadingPage />;

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <MotionWrapper>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minH={"80vh"}
      >
        <VStack>
          <Card
            width="700px"
            height="400px"
            borderRadius={"xl"}
            front={front}
            back={back}
          />
          <BackButton to="/spaced-repetition" />
        </VStack>
      </Box>
    </MotionWrapper>
  );
};

export default Session;
