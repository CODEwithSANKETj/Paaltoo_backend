const mongoose = require("mongoose");

const otp_schema = new mongoose.Schema({
    otp:{type:String , require : true}
})
const Otp_model = mongoose.model('OTP',otp_schema)

module.exports = {
    Otp_model
}