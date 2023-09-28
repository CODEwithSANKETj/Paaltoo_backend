const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
  userID: { type: String, require: true },
  ServiceType: { type: String, require: true },
  Name: { type: String, require: true },
  Price: { type: Number, require: true },
  address: { type: String, require: true },
  date: { type: String, require: true },
  animalType: { type: String, require: true },
});
const Product_model = mongoose.model("product", product_schema);

module.exports = Product_model;
