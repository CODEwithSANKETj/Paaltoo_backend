const express=require("express");
const service_provider_model = require("../Models/service_provider_model");

const service_provider_Router=express.Router();


service_provider_Router.post("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const service=new service_provider_model(payload);
           await service.save();
           res.status(200).send({"msg":"service added successful"})
    } catch (error) {
        res.status(400).send({"msg":error.massage})
    }
})

service_provider_Router.get("/get",async(req,res)=>{
     try {
        const service=await service_provider_model.find();
         res.status(200).send(service)
     } catch (error) {
        res.status(400).send({"msg":error.massage})
     }
})

module.exports=service_provider_Router;