import { Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigation, useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";
import BackButton from "../BackButton";

export interface DeckPageProps {
}

const DeckPage = ({}: DeckPageProps) => {
  const { id } = useParams<{ id: string }>();
  return (
    <MotionWrapper>
      <BackButton to="/spaced-repetition/" />
      <Heading>{id}</Heading>
    </MotionWrapper>
  );
};

export default DeckPage;
