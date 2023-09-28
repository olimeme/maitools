import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import NavCard from "../NavCard";
import MotionWrapper from "../MotionWrapper";

interface GalleryViewProps {
  cards: any;
}

const GalleryView = ({ cards }: GalleryViewProps) => {
  return (
    <MotionWrapper duration={0.3}>
      <Flex justify={"center"} alignItems="stretch" gap="2" wrap={"wrap"}>
        {/* @ts-ignore */}
        {cards.map((card, idx) => (
          <Card mt={4} width={"sm"} height={48} key={idx}>
            <CardBody>
              <Heading size={"md"}>Deck {idx + 1}</Heading>
            </CardBody>
          </Card>
          // <NavCard key={idx} card={card} />
        ))}
      </Flex>
    </MotionWrapper>
  );
};

export default GalleryView;
