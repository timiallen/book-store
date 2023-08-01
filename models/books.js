const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// pending, sold-out, active, inactive

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    authors: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { status: true },
  {
    sparse: true,
  },
  {
    timestamps: true,
  }
);

Book.plugin(passportLocalMongoose);

const BookModel = mongoose.model("Book", Book);

module.exports = BookModel;
