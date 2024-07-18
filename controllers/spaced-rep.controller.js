const SpacedRepDeck = require("../models/spaced-rep-deck");
const { SpacedRepCard } = require("../models/spaced-rep-card");

exports.getAllDecks = (req, res) => {
  SpacedRepDeck.find({
    userId: req.user.id,
  })
    .populate("cards")
    .then((decks) => {
      if (decks.length === 0) {
        res.status(404).send({
          message: "No decks found",
        });
      }
      res.status(200).send({
        decks: decks,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving decks",
      });
    });
};

exports.createDeck = (req, res, next) => {
  const deck = new SpacedRepDeck({
    deckName: req.body.deckName,
    cards: [],
    userId: req.user.id,
  });

  deck
    .save()
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error creating deck",
      });
    });
};

exports.updateDeck = (req, res, next) => {
  SpacedRepDeck.findByIdAndUpdate(
    req.body.deckId,
    {
      deckName: req.body.deckName,
    },
    { new: true }
  )
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating deck",
      });
    });
};

exports.deleteDeck = (req, res, next) => {
  SpacedRepDeck.findByIdAndDelete(req.body.deckId)
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting deck",
      });
    });
};

exports.getAllCards = (req, res, next) => {
  SpacedRepDeck.findById(req.query.deckId)
    .populate("cards")
    .then((deck) => {
      if (!deck) {
        res.status(404).send({
          message: "Deck not found",
        });
      }
      if (deck.cards.length === 0) {
        res.status(404).send({
          message: "No cards found",
        });
      }
      req.cards = deck.cards;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving cards",
      });
    });
};

exports.createCard = (req, res, next) => {
  const card = new SpacedRepCard({
    front: req.body.front,
    back: req.body.back,
    deckId: req.body.deckId,
    nextReviewDate: new Date(),
  });

  const deck = SpacedRepDeck.findById(req.body.deckId);

  if (!deck) {
    res.status(404).send({
      message: "Deck not found",
    });
  }
  deck.cards.push(card);
  deck.save().catch((err) => {
    res.status(500).send({
      message: "Error saving card to deck",
    });
  });
};

exports.updateCard = (req, res, next) => {
  SpacedRepCard.findByIdAndUpdate(
    req.body.cardId,
    {
      front: req.body.front,
      back: req.body.back,
    },
    { new: true }
  )
    .then((card) => {
      req.card = card;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating card",
      });
    });
};

exports.deleteCard = (req, res, next) => {
  SpacedRepCard.findByIdAndDelete(req.body.cardId)
    .then((card) => {
      req.card = card;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting card",
      });
    });
};
