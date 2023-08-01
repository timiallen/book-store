const jwt = require("jsonwebtoken");
const Config = require("./config");

//generates token for the admin
const generateToken = (id) => {
  const token = jwt.sign({ id }, Config.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });
  return console.log({ token });
};
// generates token for the user
const generateUSerToken = (id) => {
  const token = jwt.sign({ id }, Config.JWT_USER_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
// generates order token
const generateOrderToken = (id) => {
  const token = jwt.sign({ id }, Config.JWT, {
    expiresIn: "1d",
  });
  return token;
};
module.exports = {
  generateToken,
  generateUSerToken,
  generateOrderToken,
};
