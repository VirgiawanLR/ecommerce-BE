const jwt = require("jsonwebtoken");

// making token: creating function to make a token, token here to encoding-decoding
// data from database
module.exports = {
  createToken: (payload) => {
    return jwt.sign(
      payload, // making token: /*data untuk membuat token*/,
      "awan" /*secret key*/,
      { expiresIn: "12h" } /*batasan waktu token, lifecycle*/
    );
  },
};
