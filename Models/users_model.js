const mongoose = require('mongoose')

const user_schema =  new mongoose.Schema({
    email : {type:String , require : true},
    name : {type:String , require : true},
    age : {type:Number , require : true},
    gender : {type:String , require : true},
    password :{type:String , require : true},
    appointments :  {type:Array , require : true},
    purchase_product : {type:Array , require : true},
})
const User_model = mongoose.model('User',user_schema)

module.exports = {
    User_model
}