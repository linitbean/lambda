const router = require("express").Router();

// controllers
const WalletController = require("../controllers/wallet");

// middlewares
const permissions = require("../middlewares/permissions");
const validate = require("../middlewares/validate");
const paginate = require("../middlewares/paginate");

// validators
const { walletSchema, walletUpdateSchema } = require("../validators/wallet");

// all wallets
router.get("/", WalletController.walletList, paginate);

// wallets detail
router.get("/:symbol", WalletController.walletDetail);

// new wallet
router.post(
  "/",
  permissions(["admin"]),
  validate(walletSchema),
  WalletController.walletCreate
);

// update wallet
router.put(
  "/:symbol",
  permissions(["admin"]),
  validate(walletUpdateSchema),
  WalletController.walletUpdate
);

// delete wallet
router.delete(
  "/:symbol",
  permissions(["admin"]),
  WalletController.walletDelete
);

module.exports = router;
