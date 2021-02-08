const router = require("express").Router();

// controllers
const PaymentController = require("../controllers/payment");

// middlewares
const permissions = require("../middlewares/permissions");
const matchId = require("../middlewares/matchId");
const validate = require("../middlewares/validate");
const paginate = require("../middlewares/paginate");

// validators
const { paymentSchema, paymentUpdateSchema } = require("../validators/payment");

// all payments
router.get(
  "/admin",
  permissions(["moderator", "admin"]),
  PaymentController.paymentList,
  paginate
);

// all user payments
router.get(
  "/admin/user/:userId",
  permissions(["moderator", "admin"]),
  PaymentController.paymentUserList,
  paginate
);

// payment detail
router.get(
  "/admin/:id",
  permissions(["moderator", "admin"]),
  matchId,
  PaymentController.paymentDetail
);

// all req user payments
router.get("/", PaymentController.paymentReqUserList, paginate);

// req user payment detail
router.get("/:id", matchId, PaymentController.paymentReqUserDetail);

// new payment
router.post(
  "/",
  permissions(["admin"]),
  validate(paymentSchema),
  PaymentController.paymentCreate
);

// update payment
router.put(
  "/:id",
  permissions(["admin"]),
  validate(paymentUpdateSchema),
  matchId,
  PaymentController.paymentUpdate
);

// update payment
router.delete(
  "/:id",
  permissions(["admin"]),
  matchId,
  PaymentController.paymentDelete
);

module.exports = router;
