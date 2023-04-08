// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   let token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).send("Access denied");
//   }

//   token = token.split(" ")[1];
//   if (token === "null" || !token) {
//     return res.status(401).send("Access denied");
//   }

//   console.log(token);
//   let verifiedUser = jwt.verify(token, "awan");
//   if (!verifiedUser) {
//     return res.status(401).send("Access denied");
//   }

//   req.user = verifiedUser;
//   console.log(verifiedUser);
//   next();
// };

// const checkRole = async (req, res, next) => {
//   if (req.user.isAdmin) {
//     next();
//   } else {
//     return res.status(401).send({ message: "Access Denied" });
//   }
// };

// module.exports = {
//   verifyToken,
//   checkRole,
// };
