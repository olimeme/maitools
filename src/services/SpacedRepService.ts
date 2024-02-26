import { requestManager } from "../helpers/requestManager";

class SpacedRepService {
  static async getDeckList() {
    return await requestManager(`/spaced-rep/get-deck`, null, "get");
  }

  static async createDeck(data: string) {
    return await requestManager(
      `/spaced-rep/create-deck`,
      { deckName: data },
      "post"
    );
  }

  static async deleteDeck(deckId: string) {
    return await requestManager(
      `/spaced-rep/delete-deck`,
      {
        deckId: deckId,
      },
      "delete"
    );
  }

  static async editDeck(deckId: string, deckName: string) {
    return await requestManager(
      `/spaced-rep/update-deck`,
      {
        deckId,
        deckName,
      },
      "put"
    );
  }

  static async createCard(deckId: string, front: string, back: string) {
    return await requestManager(
      `/spaced-rep/update-deck`,
      {
        deckId,
        front,
        back,
      },
      "post"
    );
  }
}

export default SpacedRepService;
