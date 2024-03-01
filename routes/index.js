const routes = require("express").Router();
routes.use("/foo", require("./foo"));
module.exports = routes;