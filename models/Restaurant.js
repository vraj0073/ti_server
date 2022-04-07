const mongoose = require("mongoose");

const Restaurant = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("restaurants", Restaurant);

module.exports = model;
