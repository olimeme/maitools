import { Box, Card, CardBody, Center, Flex, Heading } from "@chakra-ui/react";
import MotionWrapper from "../MotionWrapper";
import SpacedRepDeck from "./SpacedRepDeck";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import AnimateBlockPresence from "../AnimateBlockPresence";
import { ISpacedRepetitionDeck } from "../../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

interface GalleryViewProps {
  items: ISpacedRepetitionDeck[];
  loading: boolean;
  handleDeleteDeck: (idx: string) => void;
  handleEditDeck: (deckName: string, id: string) => void;
}

const GalleryView = ({
  items,
  loading,
  handleDeleteDeck,
  handleEditDeck,
}: GalleryViewProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();

  return (
    <MotionWrapper duration={0.3}>
      <Flex gap={8} wrap="wrap" justifyContent="center">
        {/* <AnimateBlockPresence> */}
        {items.map((item, idx) => (
          <SpacedRepDeck
            key={item._id}
            item={item}
            loading={loading}
            handleDeleteDeck={handleDeleteDeck}
            handleEditDeck={handleEditDeck}
            style={{
              boxShadow: changeColorBasedOnTheme(
                `8px 8px #323232, 16px 16px #242424`,
                `8px 8px #e2e8f0, 16px 16px #cbd5e1`
              ),
            }}
          />
          // <NavCard key={idx} card={card} />
        ))}
        {/* </AnimateBlockPresence> */}
      </Flex>
    </MotionWrapper>
  );
};

export default GalleryView;
