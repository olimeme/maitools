import { Box, Button, Center, Heading, HStack, VStack } from "@chakra-ui/react";
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
  const [cards, setCards] = useState([] as any[]); // [front, back, id
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [frontDisplay, setFrontDisplay] = useState("");
  const [backDisplay, setBackDisplay] = useState("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCards(id);
  }, []);

  useEffect(() => {
    if (cards.length === 0) return;
    const { front, back } = getRandomCard();
    setFrontDisplay(front);
    setBackDisplay(back);
  }, [cards]);

  function fetchCards(id: string) {
    setLoading(true);
    SpacedRepService.getAllCards(id)
      .then((res) => setCards(res.cards))
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setLoading(false));
  }

  function getRandomCard() {
    console.log(cards);
    if (cards.length === 0) return { front: "", back: "" };
    const card = cards[Math.floor(Math.random() * cards.length)];
    return { front: card.front, back: card.back };
  }

  function handleCardClick() {
    const { front, back } = getRandomCard();
    setFrontDisplay(front);
    setBackDisplay(back);
  }

  function handleClickHardBtn() {
    console.log("Hard");
    handleCardClick();
  }

  function handleClickMediumBtn() {
    console.log("Medium");
    handleCardClick();
  }

  function handleClickEasyBtn() {
    console.log("Easy");
    handleCardClick();
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
            front={frontDisplay}
            back={backDisplay}
          />
          <VStack mt="16">
            <Heading size="sm" color="gray" textAlign="center" my={2}>
              How hard was it?
            </Heading>
            <HStack>
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={handleClickHardBtn}
              >
                Hard
              </Button>
              <Button
                variant="ghost"
                colorScheme="yellow"
                onClick={handleClickMediumBtn}
              >
                Medium
              </Button>
              <Button
                variant="ghost"
                colorScheme="green"
                onClick={handleClickEasyBtn}
              >
                Easy
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </MotionWrapper>
  );
};

export default Session;
