import axios from "axios";
import authAxios from "../helpers/authAxios";
import { CookieManager } from "../helpers/CookieManager";
import { ISpacedRepetitionDeck } from "../interfaces/SpacedRepetition/ISpacedRepetitionDeck";

class SpacedRepService {
  static baseURL = "https://maitools.onrender.com/spaced-rep";

  static async getDeckList() {
    try {
      const response = await authAxios.get(`${this.baseURL}/get-deck`);
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
      const response = await authAxios.post(`${this.baseURL}/create-deck`, {
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
      const response = await authAxios.delete(`${this.baseURL}/delete-deck`, {
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
}

export default SpacedRepService;
