const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const purchase = new Schema(
  {
    email: {
      type: String,
    },
    order_book_title: {
      type: String,
      required: true,
    },
  },
  {
    sparse: true,
  },
  {
    timestamps: true,
  }
);

purchase.plugin(passportLocalMongoose);

const purchaseModel = mongoose.model("Purchase", purchase);

module.exports = purchaseModel;
