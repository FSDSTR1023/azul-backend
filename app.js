const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3000;
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
});

global.io = io;

require("dotenv").config();
app.use(cors({ origin: process.env.ORIGIN_ALLOW, credentials: true }));
app.use(express.json());
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
const mailRoutes = require("./routes/mail.routes")

app.use("/user", authRoutes);
app.use("/machine", machineRoutes);
app.use("/incident", incidentRoutes);
app.use("/rent", rentRoutes);
app.use("/mail", mailRoutes);

app.get("/", (req, res) => {
  // console.log(process.env.DB_USER, "process.env.DB_USER de app.js");
  res.send("Hello Mundito!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
    io.emit("userConnection", "Usuario se acaba de conectar", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        io.emit("userConnection", "Usuario se acaba de desconectar");
      });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

server.listen(port, () => {
  console.log(`WEB SERVER listening on port ${port}`)
});
