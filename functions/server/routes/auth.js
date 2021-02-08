const router = require("express").Router();

// controllers
const AuthController = require("../controllers/auth");

// middlewares
const validate = require("../middlewares/validate");

// validators
const {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
  emailTokenSchema,
  passwordResetRequestSchema,
  passwordResetTokenSchema,
  passwordResetChangeSchema,
} = require("../validators/auth");

router.post("/register", validate(registrationSchema), AuthController.register);

router.post(
  "/verify-email",
  validate(emailTokenSchema),
  AuthController.emailVerify
);

router.post("/login", validate(loginSchema), AuthController.login);

router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  AuthController.refreshToken
);

// router.delete("/logout", AuthController.logout);

router.post(
  "/reset-password",
  validate(passwordResetRequestSchema),
  AuthController.passwordResetRequest
);
router.post(
  "/reset-password/token",
  validate(passwordResetTokenSchema),
  AuthController.passwordResetTokenVerify
);
router.post(
  "/reset-password/change",
  validate(passwordResetChangeSchema),
  AuthController.passwordResetChange
);

module.exports = router;
