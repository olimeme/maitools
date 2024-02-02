import { useEffect, useState } from "react";
import { ISpacedRepetitionCard } from "../interfaces/SpacedRepetition";

interface SpacedRepetitionHook {
  cards: ISpacedRepetitionCard[];
  currentCard: ISpacedRepetitionCard | null;
  nextCard: () => void;
  updateCard: (id: number, grade: number) => void;
}

const useSpacedRepetition = (
  initialCards: ISpacedRepetitionCard[]
): SpacedRepetitionHook => {
  const [cards, setCards] = useState<ISpacedRepetitionCard[]>(initialCards);
  const [currentCard, setCurrentCard] = useState<ISpacedRepetitionCard | null>(
    null
  );

  useEffect(() => {
    loadNextCard();
  }, [cards]);

  const getNextCard = (): ISpacedRepetitionCard | null => {
    const dueCards = cards.filter((card) => Date.now() >= card.interval);

    if (dueCards.length === 0) {
      return null;
    }

    // You can implement a more sophisticated algorithm for selecting the next card
    const nextCard = dueCards[0];
    return nextCard;
  };

  const loadNextCard = () => {
    const nextCard = getNextCard();
    setCurrentCard(nextCard);
  };

  const nextCard = () => {
    // You can perform additional actions here before moving to the next card
    loadNextCard();
  };

  const updateCard = (id: number, grade: number) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        // Update the card based on the grade and schedule the next repetition
        // You can customize the scheduling algorithm based on the grade
        const nextInterval = card.interval * 2; // For simplicity, doubling the interval
        return { ...card, interval: nextInterval };
      }
      return card;
    });

    setCards(updatedCards);
  };

  return {
    cards,
    currentCard,
    nextCard,
    updateCard,
  };
};

export default useSpacedRepetition;
