const Joi = require("joi");

const paymentSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.string().isoDate(),
  completed: Joi.boolean(),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, {
      name: "user id",
    })
    .required(),
});

const paymentUpdateSchema = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  date: Joi.string().isoDate(),
  completed: Joi.boolean(),
});

module.exports = {
  paymentSchema,
  paymentUpdateSchema,
};
