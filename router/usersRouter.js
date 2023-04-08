const express = require("express");
const { usersController } = require("../controller");
const routers = express.Router(); // API method: make a router for the API endpoint
const { auth } = require("../middleware/authToken"); // making token: importing token decoder

// API method: matching a specific method into specific route, middlewares, and logic
"/post-image", routers.post("/register", usersController.postNewRegister); // Sign-Up User
routers.post("/auth", usersController.loginData); // Login-User
routers.patch(
  "/verify/account",
  auth /* making token: inserting the middleware for decoding token*/,
  usersController.verification
);
routers.post(
  "/check-token",
  auth /* making token: inserting the middleware for decoding token*/,
  usersController.checkTokenToLogin
);

module.exports = routers; // API method: export all the routers for one specific category
