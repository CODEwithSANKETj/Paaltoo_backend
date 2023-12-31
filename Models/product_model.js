const mongoose = require("mongoose");

const product_schema = new mongoose.Schema(
  {
    image: { type: String, require: true },
    brand: { type: String, require: true },
    title: { type: String, require: true },
    details: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);
const Product_model = mongoose.model("product", product_schema);

module.exports = Product_model;
