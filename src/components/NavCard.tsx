import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { TCardItem } from "../interfaces/TCardItem";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface NavCardProps {
  card: TCardItem;
}

const NavCard = ({ card: { link, heading, desc } }: NavCardProps) => {
  return (
    <Box flexGrow={1}>
      <Link to={link}>
        <Card>
          <CardBody>
            <Heading>{heading}</Heading>
            <Text color={"gray"}>{desc}</Text>
          </CardBody>
          <CardFooter>
            <Button variant={"link"} rightIcon={<ChevronRightIcon />}>
              Go to {heading}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </Box>
  );
};

export default NavCard;
