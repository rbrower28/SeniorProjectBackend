const routes = require("express").Router();

routes.use("/", require("./swagger"));
routes.use("/account", require("./account"));
routes.use("/login", require("./login"));

module.exports = routes;