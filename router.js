const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const router = express();

// import  middleware validations
const { validateLogin } = require("./middleware/validation/auth/login");
const { validateSignup } = require("./middleware/validation/auth/signup");

const {
  ProtectMiddleware,
  userAuth,
} = require("./middleware/validation/protect_token_Middleware");

const User = require("./models/user");
// import controllers

// user contollers
const signup = require("./controllers/signup");
const login_page = require("./controllers/login");

// admin controllers
const {
  registerAdmin,
  loginAdmin,
  updateAdminPassword,
} = require("./controllers/Admin");

// books controllers
const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} = require("./controllers/books");
// orders controllers
const { Placed_orders, Book_order } = require("./controllers/orders");

// passport authentication initialization

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
router.get("/", (req, res) => {
  res.send({
    message: "app is running",
  });
});

// user routes
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, userAuth, login_page);

// admin post routes
router.post("/register/admin", registerAdmin);
router.post("/login/admin", ProtectMiddleware, loginAdmin);
router.put("/updateAdminPassword", ProtectMiddleware, updateAdminPassword);

//book  routes
router.post("/books", ProtectMiddleware, createBook);
router.get("/books", getAllBooks);
router
  .get("/books:id", getSingleBook)
  .put("/books:id", ProtectMiddleware, updateBook);

// order routes
router.get("/order:id", userAuth, Placed_orders);
router.post("/order", userAuth, Book_order);

module.exports = router;
