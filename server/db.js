const mysql = require("mysql");

module.exports = mysql.createConnection({
  host: "127.0.0.1",
  port: "8889",
  user: "admin",
  password: "",
  database: "two-step-verification",
});
