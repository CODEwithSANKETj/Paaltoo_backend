const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./Routes/users_route");
const productRouter = require("./Routes/product_route");
const serviceRouter = require("./Routes/service_route");
const service_provider_Router = require("./Routes/service_provider_route");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/service", serviceRouter);
app.use("/service_provider",service_provider_Router)

app.get('/',(req,res)=>{
  res.send(`<h1>Welcome to Home page</h1>`)
})
// listen all requests
app.listen(process.env.port, async () => {
  try {
    await connection;
    
    console.log(`Server running on port ${process.env.port}`);
  } catch (err) {
    console.log("Failed to start the server");
  }
});
