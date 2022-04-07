const mongoose = require("mongoose");

const RestaurantItem = new mongoose.Schema({
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
  itemName: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dateCreated:
  {
    type: Date,
    required:true
  }
},
 
);

const model = mongoose.model("restaurantItems", RestaurantItem);

module.exports = model;
