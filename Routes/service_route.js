const express = require("express");
const auth = require("../middleware/auth.middlware");
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const Service_model = require("../Models/service_model");
const serviceRouter = express.Router();
require('dotenv').config()
//////////EMAIL TRASNPORTER////////////

let transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth : {
      user : process.env.EMAIL_USERNAME,
      pass : 'wjhb twwy zkbe peno'
  },
})

serviceRouter.post('/request_otp', (req, res) => {
  // Generate a random OTP
  sendOTPverification(req,res)
 
});
const sendOTPverification = async(req,res)=>{

  try{
      const otp = `${Math.floor(1000+Math.random()*9000)}`
      const mailOption = {
          from : process.env.EMAIL_USERNAME,
          to : 'jaiswalsanket9404@gmail.com',
          subject : "Verify Your Email",
          html :  `
          <div style="background-color: #f2f2f2; padding: 20px;">
            <h2 style="color: #ff0000;">Verify Your Email</h2>
            <h1>Welcome to Paaltoo</h1>
            <p>Please enter the following OTP in the app to verify your email:</p>
            <div style="background-color: #ffffff; border: 1px solid #cccccc; padding: 10px; text-align: center;">
              <strong style="color: #ff0000; font-size: 24px;">${otp}</strong>
            </div>
          </div>
        `,


      }
      await transporter.sendMail(mailOption)
      res.send({ msg:'OTP send'})
  } 
  catch(err){
      res.send({err:err})
  }
}
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

serviceRouter

serviceRouter.get("/", auth, async (req, res) => {
  try {
    const service = await Service_model.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = serviceRouter;
