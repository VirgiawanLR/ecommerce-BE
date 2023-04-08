const nodemailer = require("nodemailer");

//membuat koneksi ke akun google lewat nodejs
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "virgiawanlr2@gmail.com",
    pass: "pwbcfsiwpbtxfnjy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
