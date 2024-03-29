const jwt = require("jsonwebtoken");
require("dotenv").config();

// const TOKEN_SECRET = require("../config");

const authRequired = (req, res, next) => {
  const secretToken = process.env.TOKEN_SECRET;
  const token  = req.headers.authorization.split(" ")[1];
console.log(token, "token")
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, secretToken, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;

    next();
  });
};

module.exports = authRequired;
