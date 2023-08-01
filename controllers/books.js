const Book = require("../models/books");

//create book
// POST method
async function createBook(req, res, next) {
  const { title } = req.body;

  try {
    // checking if the book already exists
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      if (existingBook.title === title) {
        throw new Error("Book already exists");
      }
    }
    //creating book process

    await Book.create(req.body);

    return res.json({ success: true, ...req.body });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}
// get all books
// GET method
const getAllBooks = async (req, res, next) => {
  try {
    let books;
    if (req.query.title && req.query.title !== "") {
      books = await Book.find({
        title: { $regex: ".*" + req.query.title + ".*" },
      });
    }
    books = await Book.find({});

    return res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

//get single book
//GET method

const getSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new Error("Book Not Found");
    }

    return res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

//update book
//PUT method

const updateBook = async (req, res, next) => {
  try {
    const { title, description, cover, authors } = req.body;
    let book = await Book.findById(req.params.id);

    if (!book) {
      res.json({
        message: "Book not found",
      });
      throw new Error("Book Not Found");
    }
    book = Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        cover,
        authors,
      },
      { runValidators: true, new: true }
    );

    res.json({
      message: "Book updated successfully",
      ...req.body,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  // get the book id
  // find and delete record
  // return success message
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
