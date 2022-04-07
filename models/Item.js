const mongoose = require("mongoose");
const Restaurant = require("./Restaurant");
const Item = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: ["NOT_ACCEPTED", "ACCEPTED", "PICKED"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Items", Item);

module.exports = model;
