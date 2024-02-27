import React, { useContext } from "react";
import { ISpacedRepetitionCard } from "../interfaces/SpacedRepetition";

export const SpacedRepContext = React.createContext({
  handleDeleteDeck: (deckId: string) => {},
  handleEditDeck: (deckId: string, deckName: string) => {},
});

export const useSpacedRepContext = () => {
  return useContext(SpacedRepContext);
};
