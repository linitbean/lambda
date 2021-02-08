const Joi = require("joi");

const messageSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  read: Joi.boolean(),
  date: Joi.string().isoDate(),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, {
      name: "user id",
    })
    .required(),
});

const messageUpdateSchema = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  read: Joi.boolean(),
  date: Joi.string().isoDate(),
});

module.exports = {
  messageSchema,
  messageUpdateSchema,
};
