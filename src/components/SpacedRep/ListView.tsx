import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "../MotionWrapper";
import SpacedRepDeck from "./SpacedRepDeck";

interface ListViewProps {
  items: any;
}

const ListView = ({ items }: ListViewProps) => {
  return (
    <MotionWrapper duration={0.3}>
      <Container maxW={"2xl"}>
        {/* @ts-ignore */}
        {items.map((item, idx) => (
          <SpacedRepDeck
            key={idx}
            idx={idx}
            item={item}
            style={{ width: "100%" }}
          />
        ))}
      </Container>
    </MotionWrapper>
  );
};

export default ListView;
