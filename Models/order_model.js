const mongoose = require("mongoose");

const Order_schema = new mongoose.Schema({
  userID: { type: String, require: true },
  image: { type: String, require: true },
  brand: { type: String, require: true },
  title: { type: Number, require: true },
  details: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
});
const Order_model = mongoose.model("Order", Order_schema);

module.exports = Order_model;
