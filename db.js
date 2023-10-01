const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGO_URL);
if(connection){
    console.log('Conneced to DB');
}
else{
    console.log('Not connected');
}
module.exports = connection;
