const Joi = require("joi");

const walletSchema = Joi.object({
  name: Joi.string().required(),
  symbol: Joi.string().uppercase().required(),
  address: Joi.string().required(),
});

const walletUpdateSchema = Joi.object({
  address: Joi.string(),
});

module.exports = {
  walletSchema,
  walletUpdateSchema,
};
