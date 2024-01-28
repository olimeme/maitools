import { Card, CardBody, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export interface SpacedRepDeckProps {
  idx: number;
  item: any;
  style?: React.CSSProperties;
}

const SpacedRepDeck = ({ idx, item, style }: SpacedRepDeckProps) => {
  return (
    <Link as={ReactRouterLink} to={`/spaced-repetition/${idx}`}>
      <Card mt={4} w={"sm"} h={36} key={idx} style={style}>
        <CardBody>
          <Heading size={"md"}>{item.name}</Heading>
        </CardBody>
      </Card>
    </Link>
  );
};

export default SpacedRepDeck;
