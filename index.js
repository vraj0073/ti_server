const express = require("express");
const app = express();
const cors = require("cors");
const itemRoutes = require("./routes/items");
const restFoodRoutes = require("./routes/restaurantfood");
const userRoutes = require("./routes/user");
const port = process.env.PORT || 8080

const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(itemRoutes);
app.use(userRoutes);
app.use(restFoodRoutes);

mongoose
  .connect(
    "mongodb+srv://arpan:arpan@cluster0.ppfl7.mongodb.net/ti_project?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
