const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
require("dotenv").config();
app.use(cookieParser());

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

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const machineRoutes = require("./routes/machine.routes");
const incidentRoutes = require("./routes/incident.routes");
const rentRoutes = require("./routes/rent.routes");

app.use("/user", authRoutes);
app.use("/machine", machineRoutes);
app.use("/incident", incidentRoutes);
app.use("/rent", rentRoutes);

app.get("/", (req, res) => {
  console.log(process.env.DB_USER, "process.env.DB_USER de app.js");
  res.send("Hello Mundito!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
