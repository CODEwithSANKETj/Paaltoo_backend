const mongoose = require('mongoose')
require('dotenv').config()
const connection  = mongoose.connect(process.env.MONGO_URL)

if(connection){
    console.log('connected to db');
}
else{
    console.log('Not connected to db');
}

module.exports = {
    connection
}