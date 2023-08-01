const express = require("express");
const router = require("./router");
const expressSession = require("express-session");
const { initMongo } = require("./services/mongoose");
const { errorHandler } = require("./middleware/errors/handler");
const { NotFound } = require("./middleware/errors");

const app = express();

initMongo();

app.use(express.json());
app.use(
  expressSession({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(router);

app.use((err) => {
  throw new NotFound();
});

app.use(errorHandler);

app.listen(4000, () => {
  console.log("running on port 4000");
});
