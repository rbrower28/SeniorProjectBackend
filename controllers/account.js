const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('tmp').collection('account').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('tmp').collection('account').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createAccount = async (req, res) => {
  // mark each post with the date and time created
  let timestamp = Date().toLocaleString();
  const account = {
    email: req.body.email,
    password: req.body.password,
    time_created: timestamp
  };
  const response = await mongodb.getDb().db('tmp').collection('account').insertOne(account);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

const updateAccount = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  // gather previous data
  const result = await mongodb.getDb().db('tmp').collection('account').find({ _id: userId });
  result.toArray().then((lists) => {
    updateData(lists[0]);
  });

  async function updateData(item) {
    
    // data not included in put request will remain
    const account = {
      email: req.body.email || item.email,
      password: req.body.password || item.password,
      time_created: item.time_created
    };

    const response = await mongodb.getDb().db('tmp').collection('account').replaceOne({ _id: userId }, account);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Something happened in contact.');
    }
  }
};

const deleteAccount = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('tmp').collection('account').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Something happened in contact.');
  }
};

module.exports = { getAll, getSingle, createAccount, updateAccount, deleteAccount };