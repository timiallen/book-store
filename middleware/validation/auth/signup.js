const { BadRequest } = require("../../errors");
const { Errors } = require("../../errors/types");

const { validateSignupSchema } = require("../schemas");

const validateSignup = async (req, res, next) => {
  try {
    // validates the signup schema before sigup
    const { error, value } = await validateSignupSchema(req.body);
    console.log({
      value,
    });

    if (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      res.json({
        message: errorMessage,
        status: true,
      });
      throw new BadRequest(Errors.USER_EXISTS, errorMessage);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateSignup,
};
