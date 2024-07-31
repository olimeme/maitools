import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import SpacedRepService from "../../services/SpacedRepService";
import BackButton from "../BackButton";

const Session = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cards, setCards] = useState([] as any[]); // [front, back, id
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    SpacedRepService.getAllCards(id)
      .then((res) => {
        setCards(res.cards);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <Heading>{cards.toString()}</Heading>
          <BackButton to="/spaced-repetition" />
        </VStack>
      </Box>
    </MotionWrapper>
  );
};

export default Session;
