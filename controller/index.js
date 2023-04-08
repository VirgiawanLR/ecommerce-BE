const usersController = require("./usersController"); // API method: import specific controller
const productsController = require("./productsController"); // API method: import specific controller

module.exports = {
  // API method: export all the controller into a bundle
  usersController,
  productsController,
};
