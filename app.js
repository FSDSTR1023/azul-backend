const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
require("dotenv").config();

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_SERVER +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";

console.log(mongoDB, "mongoDB");

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

const userRoutes = require("./routes/user.routes");

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  console.log(process.env.DB_USER, "process.env.DB_USER de app.js");
  res.send("Hello Mundito!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
