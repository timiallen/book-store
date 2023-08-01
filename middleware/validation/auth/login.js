const { validateLoginSchema } = require("../schemas");
const { MethodNotAllowed } = require("../../errors");
const { HTTP_CODES } = require("../../errors/types");

const validateLogin = async (req, res, next) => {
  try {
    console.log("in login auth");
    // validates login schema before logining user
    const { error, value } = await validateLoginSchema(req.body);
    console.log({ value });
    if (error) {
      let errorMessage = error.message;
      throw new MethodNotAllowed(HTTP_CODES.METHOD_NOT_ALLOWED, errorMessage);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateLogin,
};
