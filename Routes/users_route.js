const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User_model = require("../Models/users_model");
const blacklistModel = require("../Models/logout_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.get("/getusers", async (req, res) => {
  try {
    const users = await User_model.find();
        res.status(200).json({ allusers: users });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const verify = await User_model.findOne({ email });
    if (verify) {
      res.status(401).json({ message: "User already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(500).json({ message: err.message });
        }
        const user = new User_model({
          name,
          password: hash,
          email,
        });
        await user.save();
        res.status(200).json({ message: "User created" });
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    user = await User_model.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
        } else if (result) {
          let token = jwt.sign(
            {
              name: user.name,
              id: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          res.status(200).json({
            message: "Login successful",
            token,
            name: user.name,
            id: user._id,
          });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blacklist = await blacklistModel({ token });
    blacklist.save();
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;
