//require("dotenv").config();

//const app = require("./app");
//const sequelize = require("./config/database");

//const PORT = process.env.PORT || 3000;

require("dotenv").config();

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
});

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;


