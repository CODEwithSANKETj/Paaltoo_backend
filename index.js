const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./Routes/users_route");
const productRouter = require("./Routes/product_route");
const serviceRouter = require("./Routes/service_route");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/service", serviceRouter);

// listen all requests
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server running on port `);
  } catch (err) {
    console.log("Failed to start the server");
  }
});
