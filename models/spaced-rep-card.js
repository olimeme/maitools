const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  nextReviewDate: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Define the Card model
const SpacedRepCard = mongoose.model("SpacedRepCard", cardSchema);

module.exports = { SpacedRepCard, cardSchema };
