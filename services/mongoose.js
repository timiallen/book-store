const mongoose = require("mongoose");
const Config = require("../utils/config");

const initMongo = () => {
  console.log("mongo WTF");
  mongoose
    .connect(Config.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => {
      return console.log("database connected successfully");
    })
    .catch((err) => {
      return console.log(err.message);
    });
};

module.exports = {
  initMongo,
};
