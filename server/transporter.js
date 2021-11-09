const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "skrthbyk.mailer@gmail.com",
    pass: "hqtoemneueoobfte",
  },
});
