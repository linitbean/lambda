const Joi = require("joi");

const registrationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  password: Joi.string().trim().min(8).required(),
  pass: Joi.string()
    .trim()
    .label("password confirmation")
    .valid(Joi.ref("password"))
    .required(),

  referrer: Joi.string().pattern(/^[0-9a-fA-F]{24}$/, {
    name: "referrer id",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().trim().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.any().required(),
});

const emailTokenSchema = Joi.object({
  emailToken: Joi.any().required(),
});

const passwordResetRequestSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const passwordResetTokenSchema = Joi.object({
  passwordResetToken: Joi.any().required(),
});

const passwordResetChangeSchema = Joi.object({
  passwordResetToken: Joi.any().required(),
  password: Joi.string().trim().min(8).required(),
  pass: Joi.string()
    .trim()
    .label("password confirmation")
    .valid(Joi.ref("password"))
    .required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
  emailTokenSchema,
  passwordResetRequestSchema,
  passwordResetTokenSchema,
  passwordResetChangeSchema,
};
