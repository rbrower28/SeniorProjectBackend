const mongodb = require("../db/connect");
// const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Accounts Controller

const getOwnAccount = async (req, res, next) => {
  try {
    const data = await mongodb
      .getDb()
      .db("tmp")
      .collection("account")
      .find({ email: req.user.email, password: req.user.password })
      .toArray();

    if (!data[0]) {
      res.status(404).json({ message: "Account does not exist." });
    } else {
      res.status(200).json(data[0].email);
    }
  } catch (err) {
    res.status(400).json("Unknown Error");
  }
};

const createAccount = async (req, res) => {
  // check for existing email
  const existing = await mongodb
    .getDb()
    .db("tmp")
    .collection("account")
    .find({ email: req.body.email })
    .toArray();

  if (existing.length > 0) {
    res.status(400).json("Account with this email already exists.");
  } else {
    // encrypt password
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .json(response.error || "Something happened in contact.");
      } else {
        // mark each post with the date and time created
        let timestamp = Date().toLocaleString();
        const account = {
          email: req.body.email,
          password: hash,
          time_created: timestamp,
        };
        const token = jwt.sign(
          {
            email: req.body.email,
            password: hash,
          },
          process.env.SECRET_KEY
        );
        const response = await mongodb
          .getDb()
          .db("tmp")
          .collection("account")
          .insertOne(account);
        if (response.acknowledged) {
          res.status(201).json(token);
        } else {
          res
            .status(500)
            .json(response.error || "Something happened in contact.");
        }
      }
    });
  }
};

// const updateAccount = async (req, res) => {
//   const userId = new ObjectId(req.params.id);

//   // gather previous data
//   const result = await mongodb
//     .getDb()
//     .db("tmp")
//     .collection("account")
//     .find({ _id: userId });
//   result.toArray().then((lists) => {
//     updateData(lists[0]);
//   });

//   async function updateData(item) {
//     // data not included in put request will remain
//     const account = {
//       email: req.body.email || item.email,
//       password: req.body.password || item.password,
//       time_created: item.time_created,
//     };

//     const response = await mongodb
//       .getDb()
//       .db("tmp")
//       .collection("account")
//       .replaceOne({ _id: userId }, account);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error || "Something happened in contact.");
//     }
//   }
// };

// const deleteAccount = async (req, res) => {
//   const userId = new ObjectId(req.params.id);
//   const response = await mongodb
//     .getDb()
//     .db("tmp")
//     .collection("account")
//     .deleteOne({ _id: userId }, true);
//   if (response.deletedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || "Something happened in contact.");
//   }
// };

// LOGIN CONTROLLER

const login = async (req, res) => {
  const data = await mongodb
    .getDb()
    .db("tmp")
    .collection("account")
    .find({ email: req.body.email })
    .toArray();

  if (!data[0] || !data[0].email || !data[0].password) {
    res.status(404).json({ message: "Account does not exist." });
  } else {
    bcrypt.compare(req.body.password, data[0].password).then((result) => {
      if (result) {
        const token = jwt.sign(
          {
            email: data[0].email,
            password: data[0].password,
          },
          process.env.SECRET_KEY
        );
    
        res.status(200).json(token);
      } else {
        res.status(404).json({ message: "Incorrect password." });
      }
    });
  }
};

module.exports = {
  getOwnAccount,
  createAccount,
  // updateAccount,
  // deleteAccount,
  login,
};
