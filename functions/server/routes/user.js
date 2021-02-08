const router = require("express").Router();

// controllers
const UserController = require("../controllers/user");

//middlewares
const permissions = require("../middlewares/permissions");
const matchId = require("../middlewares/matchId");
const filter = require("../middlewares/filter");
const paginate = require("../middlewares/paginate");
const validate = require("../middlewares/validate");

// validators
const {
  userSchema,
  userUpdateSchema,
  userWalletSchema,
} = require("../validators/user");

// all users
router.get(
  "/",
  permissions(["moderator", "admin"]),
  UserController.userList,
  filter(["email", "firstName", "lastName"]),
  paginate
);

// user detail
router.get(
  "/:id",
  permissions(["moderator", "admin"]),
  matchId,
  UserController.userDetail
);

// new user
router.post(
  "/",
  permissions(["admin"]),
  validate(userSchema),
  UserController.userCreate
);

// update user
router.put(
  "/:id",
  permissions(["admin"]),
  matchId,
  validate(userUpdateSchema),
  UserController.userUpdate
);

// delete user
router.delete(
  "/:id",
  permissions(["admin"]),
  matchId,
  UserController.userDelete
);

// create user wallet
router.post(
  "/:id/wallets",
  permissions(["admin"]),
  validate(userWalletSchema),
  UserController.userWalletCreate
);

// user wallets
router.get(
  "/:id/wallets",
  permissions(["moderator", "admin"]),
  UserController.userWalletList
);

// user wallet detail
router.get(
  "/:id/wallets/:symbol",
  permissions(["moderator", "admin"]),
  UserController.userWalletDetail
);

// delete user wallet
router.delete(
  "/:id/wallets/:symbol",
  permissions(["admin"]),
  UserController.userWalletDelete
);

// delete user card
router.delete(
  "/:id/cards/:cardId",
  permissions(["admin"]),
  UserController.userCardDelete
);

module.exports = router;
