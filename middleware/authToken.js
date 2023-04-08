const jwt = require("jsonwebtoken");

// making token: middleware to decoding a token from front-end

module.exports = {
  // making token: exporting the token-decoder function (middleware)
  auth: (req, res, next) => {
    jwt.verify(req.token, "awan", (err, decode) => {
      // making token: decoding a given token into the function
      if (err) {
        return res.status(401).send("User not auth!");
      }
      req.user = decode;
      next();
    });
  },
};
