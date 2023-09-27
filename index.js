const express = require('express')
const cors = require('cors')
const { connection } = require('./db')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to backed server</h1>`)
})
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`Server running on port ${process.env.PORT}`);
    }
    catch(err){
        console.log("Failed to start the server");
    }
})
