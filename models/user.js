const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const { generateUSerToken } = require("../utils/Token_generator");

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },
  registered_at: {
    //to track the time of registration
    type: Date,
    default: Date.now,
  },
});
// encrypts user's password
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

generateUSerToken({ _id: this._id });

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
