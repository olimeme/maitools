import { ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  ChakraStyledOptions,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Link,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import PopoverDeleteButton from "../PopoverDeleteButton";
import { ISpacedRepetitionDeck } from "../../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

export interface SpacedRepDeckProps extends ChakraStyledOptions {
  item: ISpacedRepetitionDeck;
  loading: boolean;
  handleDeleteDeck: (idx: string) => void;
  handleEditDeck: (deckName: string, id: string) => void;
  style?: React.CSSProperties;
}

const SpacedRepDeck = ({
  item,
  style,
  loading,
  handleDeleteDeck,
  handleEditDeck,
  ...rest
}: SpacedRepDeckProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Card mt={4} w={"sm"} minH={36} style={style} {...rest}>
        <CardBody>
          <Flex justifyContent={"space-between"} gap={4}>
            <Box>
              <Editable
                defaultValue={item.deckName}
                onSubmit={(nextValue) => {
                  handleEditDeck(nextValue, item._id);
                }}
                submitOnBlur={false}
                isDisabled={loading}
              >
                <EditablePreview fontSize={"xl"} overflowWrap={"anywhere"} />
                <EditableInput fontSize={"xl"} />
              </Editable>
              {/* <Heading size={"md"} overflowWrap={"anywhere"}>
                {item.deckName}
              </Heading> */}
              <Text color={"grey"} fontSize={"sm"}>
                Created date:{" "}
                {new Date(item.created)
                  .toUTCString()
                  .split(" ")
                  .slice(0, 5)
                  .join(" ")}
              </Text>
            </Box>
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
        <CardFooter mb={-3}>
          <ButtonGroup>
            <Link
              as={ReactRouterLink}
              to={`/spaced-repetition/${item._id}`}
              flex={11}
              minH={12}
              style={{
                color: changeColorBasedOnTheme("white", "#2e2e2e"),
              }}
            >
              <Button variant={"ghost"}>View deck</Button>
            </Link>
            <Button rightIcon={<ArrowRightIcon />}>Start session</Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default SpacedRepDeck;
