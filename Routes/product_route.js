const express = require("express");
const Product_model = require("../Models/product_model");
const Order_model = require("../Models/order_model");
const auth = require("../middleware/auth.middlware");
const productRouter = express.Router();



productRouter.get("/", async (req, res) => {

  try {
    const { category, brand, price, limit, page } = req.query;
    const pipeline = [];
    if (category) {
      pipeline.push({ $match: { category } });
    }
    if (brand) {
      pipeline.push({ $match: { brand } });
    }
    if (price) {
      pipeline.push({ $sort: { price: price === 'Asc' ? 1 : -1 } });
    }
    if (limit) {
      const skip = page ? (page - 1) * limit : 0;
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: parseInt(limit) });
    }
    const data = await Product_model.aggregate(pipeline);
   
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.post("/addProduct",auth, async (req, res) => {
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

productRouter.patch("/edit/:id",auth, async (req, res) => {
  const { id } = req.params;
  try {
    const donationRequest = await Product_model.findByIdAndUpdate(id, req.body);
    res.status(200).json("product Request updated successfully");
    // }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.delete("/delete/:id" ,auth, async (req, res) => {
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

productRouter.post("/order" ,auth, async (req, res) => {
  try {
    const order = await Order_model.create(req.body);
    console.log("successful");
    res.status(201).json("Order created successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

productRouter.get("/getorder" ,auth, async (req, res) => {
  try {
    const order = await Order_model.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = productRouter;
