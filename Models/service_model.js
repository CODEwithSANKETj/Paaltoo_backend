const mongoose = require("mongoose");

const Service_schema = new mongoose.Schema({
  userID: { type: String, require: true },
  ServiceType: { type: String, require: true },
  Name: { type: String, require: true },
  Price: { type: Number, require: true },
  address: { type: String, require: true },
  date: { type: String, require: true },
  animalType: { type: String, require: true },
});
const Service_model = mongoose.model("Service", Service_schema);

module.exports = Service_model;
