const { Router } = require("express");
const generateOTP = require("../generateOtp");
const router = Router();

const Item = require("../models/Item");
const User = require("../models/User");
const sendMail = require("../nodeMailer");

const createItem = async (req, res) => {
  const { name, weight, quantity, sender, status } = req.body;
  try {
    const newItem = new Item({
      name,
      weight,
      quantity,
      sender,
      status,
    });

    await newItem.save();

    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("sender");
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

const acceptItem = async (req, res) => {
  const { itemId, userId } = req.body;
  try {
    const item = await Item.findById({ _id: itemId });
    const user = await User.findById({ _id: userId });

    console.log(item);
    if (!user || !item) {
      res.status(404).json({
        status: false,
        message: "Invalid ID!",
      });
      return;
    }

    item.status = "ACCEPTED";
    item.receiver = user;
    const otp = generateOTP();
    item.otp = otp;
    const response = await sendMail(user.email, otp);
    if (response == "Error") {
      res.status(404).json({
        sucess: false,
        message: "There was a problem while sending mail",
      });
      return;
    }
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

const getItemByOTP = async (req, res) => {
  const { otp } = req.query;
  try {
    console.log(otp);
    const item = await Item.findOne({ otp }).populate("receiver");
    // console.log(item);
    if (!item) {
      res.status(404).json({
        sucess: false,
        message: "Invalid OTP!",
      });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

const pickItem = async (req, res) => {
  const { itemId } = req.query;
  try {
    const item = await Item.findOne({ _id: itemId });

    console.log(item);
    if (!item) {
      res.status(404).json({
        sucess: false,
        message: "Invalid ID!",
      });
      return;
    }

    item.status = "PICKED";
    item.otp = "";
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

router.get("/getItems", getAllItems);
router.post("/createItem", createItem);
router.post("/acceptItem", acceptItem);
router.get("/getItemByOtp/", getItemByOTP);
router.get("/pickItem/", pickItem);

module.exports = router;
