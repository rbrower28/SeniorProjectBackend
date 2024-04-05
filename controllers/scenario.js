const mongodb = require("../db/connect");

// Scenario controller

const getOwnScenario = async (req, res, next) => {
  try {
    // Get current account
    const user = await mongodb
      .getDb()
      .db("tmp")
      .collection("account")
      .find({ email: req.user.email, password: req.user.password })
      .toArray();

    if (!user[0]) {
      res.status(404).json({ message: "Account does not exist." });
    } else {
      // get account's scenario
      const data = await mongodb
        .getDb()
        .db("tmp")
        .collection("scenario")
        .find({ _owner: user[0].email })
        .toArray();

      if (!data[0]) {
        res.status(404).json("Account has no saved scenario.");
      } else {
        res.status(200).json(data[0]);
      }
    }
  } catch (err) {
    res.status(400).json("Unknown Error");
  }
};

const updateScenario = async (req, res, next) => {
  try {
    // get current account
    const user = await mongodb
      .getDb()
      .db("tmp")
      .collection("account")
      .find({ email: req.user.email, password: req.user.password })
      .toArray();

    if (!user[0]) {
      res.status(404).json({ message: "Account does not exist." });
    } else {
      const scenario = {
        _owner: user[0].email,
        workIncome: req.body.workIncome,
        socialSecurity: req.body.socialSecurity,
        pension: req.body.pension,
        realEstate: req.body.realEstate,
        otherIncome: req.body.otherIncome,
        livingExpenses: req.body.livingExpenses,
        mortgage: req.body.mortgage,
        insurance: req.body.insurance,
        investing: req.body.investing,
        otherExpenses: req.body.otherExpenses,
      };

      // get account's scenario
      const existing = await mongodb
        .getDb()
        .db("tmp")
        .collection("scenario")
        .find({ _owner: user[0].email })
        .toArray();

      if (!existing[0]) {
        // If new scenario for account, create
        const response = await mongodb
          .getDb()
          .db("tmp")
          .collection("scenario")
          .insertOne(scenario);
        if (response.acknowledged) {
          res.status(201).json(scenario);
        } else {
          res.status(500).json("Something happened in contact.");
        }
      } else {
        // If account scenario exists, update
        const response = await mongodb
          .getDb()
          .db("tmp")
          .collection("scenario")
          .replaceOne({ _id: existing[0]._id }, scenario);
        if (response.modifiedCount > 0) {
          res.status(201).json(scenario);
        } else {
          res.status(500).json("Something happened in contact.");
        }
      }
    }
  } catch (err) {
    res.status(400).json("Unknown Error");
  }
};

module.exports = {
  getOwnScenario,
  updateScenario,
};
