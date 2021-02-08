const router = require("express").Router();

// controllers
const ServicesController = require("../controllers/services");

//middlewares
const permissions = require("../middlewares/permissions");
const validate = require("../middlewares/validate");

// validators
const { emailSchema } = require("../validators/email");

router.get(
  "/statistics",
  permissions(["moderator", "admin"]),
  ServicesController.statistics
);

router.post(
  "/send-mail",
  permissions(["admin"]),
  validate(emailSchema),
  ServicesController.sendMail
);

module.exports = router;
