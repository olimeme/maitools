import { Card, CardBody, Container, Heading } from "@chakra-ui/react";
import React from "react";
import MotionWrapper from "../MotionWrapper";

interface ListViewProps {
  cards: any;
}

const ListView = ({ cards }: ListViewProps) => {
  return (
    <MotionWrapper duration={0.3}>
      <Container maxW={"2xl"}>
        {/* @ts-ignore */}
        {cards.map((card, idx) => (
          <Card mt={4} height={36} key={idx}>
            <CardBody>
              <Heading size={"md"}>Deck {idx + 1}</Heading>
            </CardBody>
          </Card>
        ))}
      </Container>
    </MotionWrapper>
  );
};

export default ListView;
