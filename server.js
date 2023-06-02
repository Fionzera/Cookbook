const express = require("express");
const userRoute = require("./routes/user");
const recipesRoute = require("./routes/recipe");

const server = express();

server.use(express.json());
server.use(userRoute);
server.use(recipesRoute);

module.exports = server;
