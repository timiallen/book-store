const { default: mongoose } = require("mongoose");
const {
  orderAuth,
} = require("../middleware/validation/protect_token_Middleware");
const Book = require("../models/books");
const purchase = require("../models/purchased_books");
const Config = require("../utils/config");
const jwt = require("jsonwebtoken");

//GET method
// To get all the orders placed by the user

const Placed_orders = async (req, res, next) => {
  try {
    let orders;
    if (req.query.title && req.query.title !== "") {
      orders = await purchase.find({
        title: { $regex: ".*" + req.query.title + ".*" },
      });
    }
    orders = await purchase.find({});

    return res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

// POST method
//  /order with book id places an order for that book

const Book_order = async (req, res, next) => {
  try {
    // placing book order
    const { title } = req.body;
    console.log({ title });

    if (!req.body) {
      throw new Error("Failure! Please provide book_id and title");
    }

    // searching if the book ordered exists in the store(books db)
    console.log("book find");
    const book = await Book.findOne({ title });
    if (!book) {
      throw new Error("Book is not avaliable");
    }
    if (book) {
      // searching if book already exists in the cart
      const ordered_doc = await purchase.findOne({
        order_book_title: title,
      });
      if (ordered_doc) {
        throw new Error("Book already ordered");
      }
      // adding book to the cart
      await purchase.create({
        email: orderAuth.email,
        order_book_title: book.title,
        book_id: book[0],
      });

      return res.json({
        context: "orders",
        message: "Booked Successfully!",
        ...req.body,
      });
    }
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
  //Post method
  // user delete a particular book from cart
};
const Delete_from_cart = async (req, res, next) => {
  try {
    let cart = await purchase.findById(req.params.id);

    if (!cart) {
      res.status(401);
      throw new Error("Book not in cart");
    }
    purchase = await Book.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "book removed from cart successfully",
    });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};
module.exports = {
  Book_order,
  Delete_from_cart,
  Placed_orders,
};
