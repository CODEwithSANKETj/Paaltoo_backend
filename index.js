const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./Routes/users_route");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

// listen all requests
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server running on port `);
  } catch (err) {
    console.log("Failed to start the server");
  }
});
