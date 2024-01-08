const jwt = require("jsonwebtoken");
const secretToken = require("../config");

function createAccessToken(payload) {
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
