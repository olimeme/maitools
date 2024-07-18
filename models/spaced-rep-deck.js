const mongoose = require("mongoose");

const spacedRepDeckSchema = new mongoose.Schema({
  deckName: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SpacedRepCard",
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const SpacedRepDeck = mongoose.model("SpacedRepDeck", spacedRepDeckSchema);

module.exports = SpacedRepDeck;
