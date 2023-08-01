const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Config = require("../../utils/config");
const { Unauthorized } = require("../errors");
const { HTTP_CODES } = require("../errors/types");
const admin = require("../../models/admin");

const ProtectMiddleware = async (err, req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }

  if (!token) {
    res.status(401).json({
      message: "Not Authorised to access this route ",
    });
    const error = err.message;
    throw new Unauthorized(HTTP_CODES.UNAUTHORIZED, error);
  }

  try {
    let decoded = jwt.verify(token, Config.JWT_SECRET_KEY);
    req.user = await admin.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
};
const userAuth = async (err, req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }

  if (!token) {
    res.status(401).json({
      message: "Not Authorised to access this route ",
    });
    const error = err.message;
    throw new Unauthorized(HTTP_CODES.UNAUTHORIZED, error);
  }

  try {
    let decoded = jwt.verify(token, Config.JWT_USER_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    return next();
  } catch (err) {
    return next(err);
  }
};
const orderAuth = async (req, res, next) => {
  let respconfig = req.resp;
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }

  respconfig = jwt.verify(token, Config.JWT);
  return respconfig;
};
module.exports = {
  ProtectMiddleware,
  userAuth,
  orderAuth,
};
