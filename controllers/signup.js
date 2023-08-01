const User = require("../models/user");
const { BadRequest } = require("../middleware/errors/index");

async function signup(req, res, next) {
  const { username, password, email, dateOfBirth } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (existingUser) {
      // if there is a match which means user exists
      // throw error
      if (existingUser.username === username) {
        let obj = {
          errCode: "",
          message: "Username already registered",
        };

        throw new BadRequest(obj);
      }

      // if there is a match which means email exists before
      // signup
      if (existingUser.email === email) {
        let obj = {
          errCode: "",
          message: "email already regisetred",
        };

        throw new BadRequest(obj);
      }
    }

    //The signing up process
    await User.create({
      username,
      password,
      email,
      dateOfBirth,
    });

    return res.json({
      status: true,
      ...req.body,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = signup;
