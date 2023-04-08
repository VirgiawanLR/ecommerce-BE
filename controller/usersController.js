const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/createToken");
// making token: importing token maker function for Sign-Up User method
const { mail } = require("../helper/mail");
const transporter = require("../helper/nodemailer");

// API method: initialize with create controller folder and
// file for better code management
module.exports = {
  // API method: export into index.js file in controller folder
  // API method: create a logic for specific method
  postNewRegister: async (req, res) => {
    // Sign-Up User: create the function
    const { fullname, username, email, password } = req.body;

    // Sign-Up User: mengambil data dari database dengan email = email
    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      // Sign-Up User: kalo ada email yang sudah terdaftar, kirim response gagal register
      return res
        .status(400)
        .send({ message: "Email has been used", isSuccess: false });
    }
    // Sign-Up User: kalo ga ada kita hashing password sebelum masuk database
    // Sign-Up User: metoda hashing liat nanti di dokumentasi nya
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Sign-Up User: masukkan semua data ke database termasuk password yang sudah di hashing
    let insertQuery = `insert into users (fullname, username, email, password) values (${db.escape(
      fullname
    )},${db.escape(username)},${db.escape(email)},${db.escape(hashPassword)})`;
    let addUserResult = await query(insertQuery);
    // Sign-Up User: setelah berhasil create new data pada database, buat token untuk kepentingan verifikasi
    if (addUserResult.insertId) {
      // Sign-Up User: apabila query berhasil maka akan muncul insertId, maka insertId digunakan sebagai
      // checker
      // making token: buat token dengan data user sebagai payload
      let token = createToken({
        id_users: addUserResult.insertId,
        username,
        email,
        isAdmin: 0,
        isVerified: 0,
      });
      // Sign-Up User: buat email untuk mengirimkan link verification
      let mailToSend = mail(email, token);
      transporter.sendMail(mailToSend, (errMail, resMail) => {
        if (errMail) {
          console.log(errMail);
          return res.status(500).send({
            message: "Registration failed",
            isSuccess: false,
            err: errMail,
          });
        } else {
          return res
            .status(200)
            .send({ message: "Registration Success", isSuccess: true });
        }
      });
    }
  },

  verification: async (req, res) => {
    // Sign-Up User: method verifikasi user baru
    let updateQuery = `Update users set isVerified=1 where id_users=${req.user.id_users}`;
    // Sign-Up User: merubah status verify menjadi benar apabila user mengakses
    // link verifikasi
    try {
      const updateResult = await query(updateQuery);
      return res.status(200).send({ updateResult, isSuccess: true });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error, isSuccess: false });
    }
  },

  loginData: async (req, res) => {
    try {
      // Login-User: ambil data user yang emailnya = email dari body
      const { email, password } = req.body;
      const isEmailExist = await query(
        `SELECT * from users where email=${db.escape(email)}`
      );
      // Login-User: cek apakah ada emailnya, kalo ga ada response email password salah

      if (isEmailExist.length == 0) {
        return res
          .status(400)
          .send({ message: "email not yet register", isSuccess: false });
      }

      // Login-User: kalo ada, cek password nya menggunakan bcrypt
      const isValid = await bcrypt.compare(password, isEmailExist[0].password);

      if (!isValid) {
        // Login-User: kalo salah passwordnya, response email password salah
        return res
          .status(400)
          .send({ message: "email or password invalid", isSuccess: false });
      }

      // Login-User: check apakah akun sudah di verifikasi atau belum
      if (!isEmailExist[0].isVerified) {
        return res.status(400).send({
          message: "Your account is not yet verify",
          isSuccess: false,
        });
      }
      // Login-User: buat user data object sebagai payload token
      let userData = {
        isAdmin: isEmailExist[0].isAdmin,
        fullname: isEmailExist[0].fullname,
        username: isEmailExist[0].username,
        email: isEmailExist[0].email,
      };

      // Login-User: kalo bener kita buatin token untuk user login
      let payload = {
        id_users: isEmailExist[0].id_users,
        ...userData,
      };
      // Login-User: buat token, token ini akan disimpan di local storage
      // sehingga saat reload page maka user tetap akan login ke akunnya
      const token = createToken(payload);

      // Login-User: lalu respons send
      return res
        .status(200)
        .send({ token, userData, message: "login success", isSuccess: true });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },

  checkTokenToLogin: async (req, res) => {
    // Login-User: cek data hasil decoding token pada local storage,
    // apakah sesuai dengan data di database
    try {
      let user = await query(
        `select * from users where id_users=${db.escape(req.user.id_users)}`
      );
      return res.status(200).send(user);
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
