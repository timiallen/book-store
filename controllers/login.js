const bcrypt = require("bcrypt");
const { UserNotFound } = require("../middleware/errors");
const { HTTP_CODES } = require("../middleware/errors/types");
const User = require("../models/user");

async function login_page(req, res, next) {
  try {
    console.log("in login page");
    const { username, password } = req.body;

    //checks if user was registered before login
    const registeredUser = await User.findOne({ username }).select("+password");
    // if user is not found
    if (!registeredUser) {
      // throw error`
      throw new UserNotFound(HTTP_CODES.REQUEST_FAILED);
    }
    if (registeredUser) {
      if (username !== registeredUser.username) {
        throw new UserNotFound(HTTP_CODES.NOT_FOUND);
      }
      // if password is not equal to DB password, throw error
      const match = await bcrypt.compare(password, registeredUser.password);
      if (!match) {
        throw new Error("incorrect passsword");
      }
    }

    return res.json({
      message: "login successful",
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = login_page;
