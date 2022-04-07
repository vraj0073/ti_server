const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const RestaurantItem = require("../models/RestaurantItem");
const { collection, db } = require("../models/Item");
const restaurantItemModelName = RestaurantItem.modelName;

//POST request
const createRestaurantItem = async (req, res) => {
  const { restaurantName, address, phoneNumber, email, itemName, weight, dateCreated } =
    req.body;

  try {
    const newRestaurantItem = new RestaurantItem({
      restaurantName,
      address,
      phoneNumber,
      email,
      itemName,
      weight,
      dateCreated
    });

    //const result = await newRestaurant.save();
    const result = await db
      .collection(restaurantItemModelName)
      .insertOne(newRestaurantItem);

    //let insertedRestId = result.insertedId;

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

//GET request to get all items
const getRestaurantItem = async (req, res) => {
  try {
    const foodItemData = await RestaurantItem.find();
    console.log(foodItemData);
    res.send(foodItemData);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

router.post("/create-restaurant-item", createRestaurantItem);
router.get("/get-all-items", getRestaurantItem);

module.exports = router;
