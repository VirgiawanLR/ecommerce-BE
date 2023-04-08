const express = require("express"); // initialize backend: set up express
const cors = require("cors"); // initialize backend: cors for FE permission access
const PORT = 3001; // initialize backend: defining PORT for the API
const app = express(); // initialize backend: create the API
const { usersRouter, productsRouter } = require("./router");
const { db } = require("./database"); // database: import the database connection into the main execute file

const bearerToken = require("express-bearer-token");

app.use(cors());
app.use(express.json()); // initialize backend: json interpreter, so
// your API understand JSON structure data

app.use(express.static("public"));
app.use(bearerToken());

app.use("/user", usersRouter);
// API method: defining specific endpoint for specific category
app.use("/product", productsRouter);

app.listen(PORT, () => {
  // initialize backend: execute your API in defined PORT
  console.log("SERVER RUNNING ON PORT: ", PORT);
});

// initialize backend: for authentication and authorization we need to install modules
// making token: npm i jsonwebtoken express-bearer-token
// npm install nodemailer
// npm install bcrypt for hashing password
// npm install mysql2 and util to make a connection into your databases
// npm install multer to enable file uploading
