import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

export interface SpacedRepDeckProps extends ChakraStyledOptions {
  idx: number;
  item: any;
  handleDeleteDeck: (idx: number) => void;
  style?: React.CSSProperties;
}

const SpacedRepDeck = ({
  idx,
  item,
  style,
  handleDeleteDeck,
  ...rest
}: SpacedRepDeckProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Card mt={4} w={"sm"} minH={36} key={idx} style={style} {...rest}>
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Link
              as={ReactRouterLink}
              to={`/spaced-repetition/${idx}`}
              flex={11}
              minH={24}
              style={{
                color: changeColorBasedOnTheme("white", "#2e2e2e"),
              }}
            >
              <Box>
                <Heading size={"md"} overflowWrap={"anywhere"}>
                  {item.name}
                </Heading>
              </Box>
            </Link>
            <Box flex={1}>
              <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                closeOnEsc
              >
                <PopoverTrigger>
                  <IconButton
                    size={"xs"}
                    aria-label="delete"
                    float={"right"}
                    icon={<DeleteIcon />}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    Are you sure you want to delete the deck?
                  </PopoverHeader>
                  <PopoverBody>
                    <Button
                      colorScheme="red"
                      mr={2}
                      onClick={() => {
                        handleDeleteDeck(idx);
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                    <Button variant={"ghost"} onClick={onClose}>
                      Cancel
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default SpacedRepDeck;
