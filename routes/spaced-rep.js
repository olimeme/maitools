var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT");
const {
  getAllDecks,
  createDeck,
  updateDeck,
  deleteDeck,
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/spaced-rep.controller");
const SpacedRepDeck = require("../models/spaced-rep-deck");
const { SpacedRepCard } = require("../models/spaced-rep-card");

router.get(
  "/spaced-rep/get-deck",
  verifyToken,
  getAllDecks,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Decks fetched successfully",
    });
  }
);

router.post(
  "/spaced-rep/create-deck",
  verifyToken,
  createDeck,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Deck created successfully",
      deck: req.deck,
    });
  }
);

router.put(
  "/spaced-rep/update-deck",
  verifyToken,
  updateDeck,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Deck updated successfully",
      deck: req.deck,
    });
  }
);

router.delete(
  "/spaced-rep/delete-deck",
  verifyToken,
  deleteDeck,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Deck deleted successfully",
    });
  }
);

router.get(
  "/spaced-rep/get-all-cards",
  verifyToken,
  getAllCards,
  async function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      cards: req.cards,
    });
  }
);

router.post("/spaced-rep/create-card", verifyToken, async function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  try {
    const { front, back, deckId } = req.body;
    const deck = await SpacedRepDeck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    const card = new SpacedRepCard({
      front,
      back,
      deckId: req.body.deckId,
      nextReviewDate: new Date(),
    });
    await card.save();

    deck.cards.push(card);
    await deck.save();

    // res.json(deck);
    res.status(200).send({
      card: card,
      message: "Card created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/spaced-rep/update-card",
  verifyToken,
  updateCard,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Card updated successfully",
      card: req.card,
    });
  }
);

router.delete(
  "/spaced-rep/delete-card",
  verifyToken,
  deleteCard,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Card deleted successfully",
    });
  }
);

module.exports = router;
