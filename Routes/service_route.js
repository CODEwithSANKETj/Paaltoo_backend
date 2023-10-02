const express = require("express");
const auth = require("../middleware/auth.middlware");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const Service_model = require("../Models/service_model");
const { Otp_model } = require("../Models/Otp_model");
const serviceRouter = express.Router();
require("dotenv").config();

serviceRouter.get("/getappointment", async (req, res) => {
  try {
    const data = await Service_model.find();
    res.send({ data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//////////EMAIL TRASNPORTER////////////

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: "wjhb twwy zkbe peno",
  },
});

serviceRouter.post("/request_otp", (req, res) => {
  // Generate a random OTP
  const email = req.body.email;
  //console.log(email);
  if (email) {
    sendOTPverification(email, res);
  } else {
    res.status(404).send("Please provid the Email");
  }
});
const sendOTPverification = async (email, res) => {
  console.log(email);
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    //localStorage.setItem('otp',otp)
    const new_otp = await Otp_model.create({ otp: otp });
    new_otp.save();
    const mailOption = {
      from: process.env.EMAIL_USERNAME,
      to: `${email}`,
      subject: "Verify Your Email",
      html: `
          <div style="background-color: #f2f2f2; padding: 20px;">
            <h2 style="color: #ff0000;">Verify Your Email</h2>
            <h1>Welcome to Paaltoo</h1>
            <p>Please enter the following OTP in the app to verify your email:</p>
            <div style="background-color: #ffffff; border: 1px solid #cccccc; padding: 10px; text-align: center;">
              <strong style="color: #ff0000; font-size: 24px;">${otp}</strong>
            </div>
          </div>
        `,
    };
    await transporter.sendMail(mailOption);
    res.send({ msg: "OTP send" });
  } catch (err) {
    res.send({ err: err });
  }
};
serviceRouter.post("/verify_otp", async (req, res) => {
  const { otp } = req.body;
  //console.log(otp);
  try {
    const stored_otp = await Otp_model.find({ otp: otp });
    //console.log(stored_otp);
    if (stored_otp.length > 0) {
      // console.log(stored_otp[0].otp==otp);
      if (stored_otp[0].otp == otp) {
        await Otp_model.deleteMany({});
        return res.status(200).send("OTP verified SuccessFully");
      } else {
        return res.status(404).send("Invalid OTP");
      }
    } else {
      res.status(404).send("Invalid OTP");
    }
  } catch (err) {}
});
///////////////DO NOT TOUCH////////////
serviceRouter.post("/register", auth, async (req, res) => {
  console.log(req.body);
  try {
    const service = await Service_model.create(req.body);
    service.save();
    res.status(201).json("Service created successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

serviceRouter.get("/", async (req, res) => {
  try {
    const service = await Service_model.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = serviceRouter;
