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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

export interface SpacedRepCardProps extends ChakraStyledOptions {
  idx: number;
  item: any;
  handleDeleteDeck: (idx: number) => void;
  style?: React.CSSProperties;
}

const SpacedRepCard = ({
  idx,
  item,
  style,
  handleDeleteDeck,
  ...rest
}: SpacedRepCardProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Card mt={4} w={"sm"} minH={36} key={idx} style={style} {...rest}>
      <CardBody>
        <Flex justifyContent={"space-between"}>
          <Box
            flex={11}
            minH={24}
            style={{
              color: changeColorBasedOnTheme("white", "#2e2e2e"),
            }}
          >
            <Heading size={"md"} overflowWrap={"anywhere"}>
              {item.name}
            </Heading>
          </Box>
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
  );
};

export default SpacedRepCard;
