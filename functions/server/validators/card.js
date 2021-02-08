const Joi = require("joi");

const cardSchema = Joi.object({
  cardHolder: Joi.string().required(),
  cardNumber: Joi.string().required(),
  expDate: Joi.string().required(),
  cvv: Joi.string().required(),
  issuer: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip: Joi.string().required(),
});

module.exports = { cardSchema };
