import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "../MotionWrapper";
import SpacedRepDeck from "./SpacedRepDeck";
import { motion, AnimatePresence } from "framer-motion";
import AnimateBlockPresence from "../AnimateBlockPresence";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

interface ListViewProps {
  items: any;
  handleDeleteDeck: (idx: number) => void;
}

const ListView = ({ items, handleDeleteDeck }: ListViewProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  return (
    <MotionWrapper duration={0.3}>
      <Container maxW={"2xl"}>
        <AnimateBlockPresence>
          {/* @ts-ignore */}
          {items.map((item, idx) => (
            <SpacedRepDeck
              key={idx}
              idx={idx}
              item={item}
              mt={8}
              w={"100%"}
              style={{
                boxShadow: changeColorBasedOnTheme(
                  `8px 8px #323232, 16px 16px #242424`,
                  `8px 8px #e2e8f0, 16px 16px #cbd5e1`
                ),
              }}
              handleDeleteDeck={handleDeleteDeck}
            />
          ))}
        </AnimateBlockPresence>
      </Container>
    </MotionWrapper>
  );
};

export default ListView;
