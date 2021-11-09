// Dependencies
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./db");

// Express
const app = express();

// Routes
const routes = require("./routes");

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//
app.use("/", routes);

//
const server = http.createServer(app);
//
try {
  const PORT = 2323;
  server.listen(PORT);
  console.log("###### Sunucu Başlatıldı => http://192.168.43.185:" + PORT);

  db.connect((err) => {
    if (!err) {
      console.log("###### Veri Tabanına Bağlanıldı");
    } else {
      console.log("###### Veri Tabanına Bağlanılamadı");
    }
  });
} catch (e) {
  console.error(e);
}
