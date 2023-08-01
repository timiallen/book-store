const dote = require("dotenv");
dote.config();

const Config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_USER_SECRET_KEY: process.env.JWT_USER_SECRET_KEY,
  JWT: process.env.JWT,
  TOKEN: process.env.TOKEN,
};

module.exports = Config;
