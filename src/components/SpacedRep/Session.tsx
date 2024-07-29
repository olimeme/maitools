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
import CardComponent from "./Card";

const Card = withClick(CardComponent);

const Session = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState([] as any[]); // [front, back, id
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    SpacedRepService.getAllCards(id)
      .then((res) => {
        setCards(res.cards);
        console.log(res.cards);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  function onClickHandler() {
    setRevealed(!revealed);
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
          <Card width="500px" height="300px" />
          <BackButton to="/spaced-repetition" />
        </VStack>
      </Box>
    </MotionWrapper>
  );
};

export default Session;
