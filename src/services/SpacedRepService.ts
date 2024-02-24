import authAxios from "../helpers/authAxios";
import { CookieManager } from "../helpers/CookieManager";
import { ISpacedRepetitionDeck } from "../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

class SpacedRepService {

  static async getDeckList() {
    try {
      const response = await authAxios.get(`/spaced-rep/get-deck`);
      return Promise.resolve(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }

  static async createDeck(data: string) {
    try {
      const response = await authAxios.post(`/spaced-rep/create-deck`, {
        deckName: data,
      });
      return Promise.resolve(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }

  static async deleteDeck(deckId: string) {
    try {
      const response = await authAxios.delete(`/spaced-rep/delete-deck`, {
        data: { deckId },
      });
      return Promise.resolve(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }

  static async editDeck(deckId: string, deckName: string) {
    try {
      const response = await authAxios.put(`/spaced-rep/update-deck`, {
        deckId,
        deckName,
      });
      return Promise.resolve(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message;
      if (message) {
        return Promise.reject(message);
      }
      const defaultErr = error.response?.data?.statusText;
      if (defaultErr) {
        return Promise.reject(defaultErr);
      } else {
        return Promise.reject("Server Error");
      }
    }
  }
}

export default SpacedRepService;
