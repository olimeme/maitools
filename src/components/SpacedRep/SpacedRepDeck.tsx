import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  ChakraStyledOptions,
  Flex,
  Heading,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import PopoverDeleteButton from "../PopoverDeleteButton";
import { ISpacedRepetitionDeck } from "../../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

export interface SpacedRepDeckProps extends ChakraStyledOptions {
  item: ISpacedRepetitionDeck;
  handleDeleteDeck: (idx: string) => void;
  style?: React.CSSProperties;
}

const SpacedRepDeck = ({
  item,
  style,
  handleDeleteDeck,
  ...rest
}: SpacedRepDeckProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Card mt={4} w={"sm"} minH={36} style={style} {...rest}>
        <CardBody>
          <Flex justifyContent={"space-between"} gap={4}>
            <Link
              as={ReactRouterLink}
              to={`/spaced-repetition/${item._id}`}
              flex={11}
              minH={12}
              style={{
                color: changeColorBasedOnTheme("white", "#2e2e2e"),
              }}
            >
              <Box>
                <Heading size={"md"} overflowWrap={"anywhere"}>
                  {item.deckName}
                </Heading>
              </Box>
            </Link>
            <Spacer />
            <Box flex={1}>
              <PopoverDeleteButton
                handleDelete={() => {
                  handleDeleteDeck(item._id);
                  onClose();
                }}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            </Box>
          </Flex>
        </CardBody>
        <CardFooter>
          <Text color={"grey"} fontSize={"sm"}>
            Created date:{" "}
            {new Date(item.created)
              .toUTCString()
              .split(" ")
              .slice(0, 5)
              .join(" ")}
          </Text>
        </CardFooter>
      </Card>
    </>
  );
};

export default SpacedRepDeck;
