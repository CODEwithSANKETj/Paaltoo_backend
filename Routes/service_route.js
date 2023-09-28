const express = require("express");
const auth = require("../middleware/auth.middlware");
const Service_model = require("../Models/service_model");
const serviceRouter = express.Router();

serviceRouter.post("/", auth, async (req, res) => {
  try {
    const service = await Service_model.create(req.body);
    res.status(201).json("Service created successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

serviceRouter.get("/", auth, async (req, res) => {
  try {
    const service = await Service_model.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = serviceRouter;
