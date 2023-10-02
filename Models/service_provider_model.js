const mongoose = require("mongoose");

const Service_schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    image: { type: String, require: true },
    details: { type: String, require: true },
    Price: { type: Number, require: true },
  },
  {
    versionKey: false,
  }
);
const service_provider_model = mongoose.model("service_provider", Service_schema);

module.exports = service_provider_model;
