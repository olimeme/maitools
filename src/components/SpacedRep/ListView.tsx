import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "../MotionWrapper";
import SpacedRepDeck from "./SpacedRepDeck";
import { motion, AnimatePresence } from "framer-motion";
import AnimateBlockPresence from "../AnimateBlockPresence";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import { ISpacedRepetitionDeck } from "../../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

interface ListViewProps {
  items: ISpacedRepetitionDeck[];
  loading: boolean;
  handleDeleteDeck: (idx: string) => void;
  handleEditDeck: (deckName: string, id: string) => void;
}

const ListView = ({
  items,
  loading,
  handleDeleteDeck,
  handleEditDeck,
}: ListViewProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  return (
    <MotionWrapper duration={0.3}>
      <Container maxW={"2xl"}>
        {/* <AnimateBlockPresence> */}
        {items.map((item, idx) => (
          <SpacedRepDeck
            key={item._id}
            item={item}
            loading={loading}
            handleDeleteDeck={handleDeleteDeck}
            handleEditDeck={handleEditDeck}
            style={{
              boxShadow: changeColorBasedOnTheme(
                `8px 8px #323232, 16px 16px #242424`,
                `8px 8px #e2e8f0, 16px 16px #cbd5e1`
              ),
            }}
          />
        ))}
        {/* </AnimateBlockPresence> */}
      </Container>
    </MotionWrapper>
  );
};

export default ListView;
