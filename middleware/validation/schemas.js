const Joi = require("joi").extend(require("@joi/date"));

const validateSignupSchema = async (requestBody) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/) // at least one digit in any position
      .min(4)
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    dateOfBirth: Joi.date().format("YYYY-MM-DD").required(),
  })
    .with("username", "password")
    .with("email", "dateOfBirth");

  const { error, value } = await schema.validate(requestBody);

  return {
    error,
    value,
  };
};

const validateLoginSchema = async (requestBody) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.required(),
  });

  const { error, value } = await schema.validate(requestBody);
  return {
    error,
    value,
  };
};

module.exports = {
  validateSignupSchema,
  validateLoginSchema,
};
