const express = require("express");
const { productsController } = require("../controller");
const routers = express.Router(); // API method: make a router for the API endpoint
const upload = require("../middleware/multer");

routers.post(
  // API method: matching a specific method into specific route, middlewares, and logic
  "/post-image",
  upload.single("file"),
  productsController.postNewProduct
);

module.exports = routers;
