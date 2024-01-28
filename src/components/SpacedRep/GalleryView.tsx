import { Box, Card, CardBody, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import NavCard from "../NavCard";
import MotionWrapper from "../MotionWrapper";
import SpacedRepDeck from "./SpacedRepDeck";

interface GalleryViewProps {
  items: any;
}

const GalleryView = ({ items }: GalleryViewProps) => {
  return (
    <MotionWrapper duration={0.3}>
      <Flex gap={2} wrap="wrap" justifyContent="center">
        {/* @ts-ignore */}
        {items.map((item, idx) => (
          <SpacedRepDeck key={idx} idx={idx} item={item} />
          // <NavCard key={idx} card={card} />
        ))}
      </Flex>
    </MotionWrapper>
  );
};

export default GalleryView;
