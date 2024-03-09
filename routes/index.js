const routes = require("express").Router();

routes.use("/", require("./swagger"));
routes.use("/account", require("./account"));

module.exports = routes;