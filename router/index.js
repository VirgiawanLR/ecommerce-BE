const usersRouter = require("./usersRouter");
// API method: importing all routers from various endpoint category
const productsRouter = require("./productsRouter");

module.exports = {
  // API method: exporting all endpoint-category routers
  usersRouter,
  productsRouter,
};
