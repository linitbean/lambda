const Joi = require("joi");

const emailSchema = Joi.object({
  from: Joi.string().lowercase(),
  email: Joi.string().email().lowercase().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  body2: Joi.string(),
  body3: Joi.string(),
});

module.exports = {
  emailSchema,
};
