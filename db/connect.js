const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
  console.log("Db already initialized!");
  return callback(null, _db);
  }
  MongoClient.connect(process.env.CONN_STR)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {initDb, getDb};