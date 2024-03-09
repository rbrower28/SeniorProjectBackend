const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongodb = require("./db/connect");

// can switch between localhost or current deployed port
const port = process.env.port || 8080

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })

// redirect to routes folder
app.use("/", require("./routes"));

process.on("uncaughtException", (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  app.use((req, res, next) => {
    res.status(400).json({ message: err });
  })
})

// initialize db
mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });