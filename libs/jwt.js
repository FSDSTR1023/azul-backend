const jwt = require("jsonwebtoken");
require("dotenv").config();

// const secretToken = require("../config");

function createAccessToken(payload) {
  const secretToken = process.env.TOKEN_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretToken,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

module.exports = createAccessToken;
