const express = require("express");
const Product_model = require("../Models/product_model");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    existing_title = await Product_model.findOne({ title: title });
    if (existing_title) {
      res.status(400).json({ message: "The product already exist" });
    } else {
      const donationRequest = await Product_model.create(req.body);
      donationRequest.save();
      res.status(201).json(donationRequest);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const donationRequest = await Product_model.findByIdAndUpdate(id, req.body);
    res.status(200).json("product Request updated successfully");
    // }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const isuser = await Product_model.findById(id);
    if (isuser.userID !== req.body.userID) {
      res.status(401).json({ message: "Not Authorized" });
    } else {
      const donationRequest = await Product_model.findByIdAndDelete(id);
      res.status(200).json("Donation Request updated successfully");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
