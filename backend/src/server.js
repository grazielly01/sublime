require("dotenv").config();

const app = require("./app");
const sequelize = require("../database");

const PORT = process.env.PORT || 3000;

