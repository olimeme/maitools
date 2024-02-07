import ISpacedRepetitionCard from "./ISpacedRepetitionCard";

export interface ISpacedRepetitionDeck {
  _id: string;
  deckName: string;
  cards: ISpacedRepetitionCard[];
  userId: number;
  created: Date;
}
