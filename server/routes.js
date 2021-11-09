const router = require("express").Router();
const transporter = require("./transporter");
const makeCode = require("./makeCode");
const db = require("./db");
const md5 = require("crypto-js/md5");

const verifyUser = ({ email, password }, run) => {
  const sql = "SELECT * FROM users WHERE email=? AND password=? LIMIT 1";
  const values = [email, md5(password).toString()];
  db.query(sql, values, run);
};

const createCode = ({ user_id, code }, run) => {
  const sql = "INSERT INTO codes (user_id, code, date) VALUES (?, ?, ?)";
  const values = [user_id, code, new Date()];
  db.query(sql, values, run);
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyUser({ email, password }, async (err, user) => {
      if (!err && user && user[0]) {
        const code = makeCode(6);
        await createCode({ user_id: user[0].user_id, code }, async (err) => {
          if (!err) {
            // Doğrulama Kodunu Maile Gönder
            await transporter.sendMail({
              from: "Şükrü Taha Bıyık <skrthbyk.mailer@gmail.com>",
              to: email,
              subject: "İki Adımlı Doğrulama",
              html: "Doğrulama Kodu: " + code,
            });

            // Cevap Döndür
            res.json({
              error: false,
            });
          } else {
            // Hata Döndür
            res.json({
              error: true,
              errorCode: 2,
            });
          }
        });
      } else {
        // Hata Döndür
        res.json({
          error: true,
          errorCode: 1,
        });
      }
    });
  } catch (err) {
    // Hata Döndür
    res.json({
      error: true,
      errorCode: 0,
    });
  }
});

const verifyCode = ({ user_id, code }, run) => {
  const sql = "SELECT * FROM codes WHERE user_id=? AND code=? LIMIT 1";
  const values = [user_id, code];
  db.query(sql, values, run);
};

router.post("/verify", async (req, res) => {
  try {
    const { email, password, code } = req.body;
    console.log(code);
    await verifyUser({ email, password }, async (err, user) => {
      if (!err && user && user[0]) {
        await verifyCode(
          { user_id: user[0].user_id, code },
          async (err, result) => {
            if (!err && result && result[0]) {
              let second = Math.floor(
                (new Date() - new Date(result[0].date)) / 1000
              );
              if (second <= 120) {
                res.json({
                  error: false,
                  user: user[0],
                });
              } else {
                res.json({
                  error: true,
                  errorCode: 3,
                });
              }
            } else {
              res.json({
                error: true,
                errorCode: 2,
              });
            }
          }
        );
      } else {
        res.json({
          error: true,
          errorCode: 1,
        });
      }
    });
  } catch (err) {
    res.json({
      error: true,
      errorCode: 0,
    });
  }
});

module.exports = router;
