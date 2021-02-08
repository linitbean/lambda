const router = require("express").Router();

// controllers
const MessageController = require("../controllers/message");

// middlewares
const permissions = require("../middlewares/permissions");
const matchId = require("../middlewares/matchId");
const validate = require("../middlewares/validate");
const paginate = require("../middlewares/paginate");

// validators
const { messageSchema, messageUpdateSchema } = require("../validators/message");

// all messages
router.get(
  "/admin",
  permissions(["moderator", "admin"]),
  MessageController.messageList,
  paginate
);

// all user messages
router.get(
  "/admin/user/:userId",
  permissions(["moderator", "admin"]),
  MessageController.messageUserList,
  paginate
);

// payment detail
router.get(
  "/admin/:id",
  permissions(["moderator", "admin"]),
  matchId,
  MessageController.messageDetail
);

// all req user payments
router.get("/", MessageController.messageReqUserList, paginate);

// req user payment detail
router.get("/:id", matchId, MessageController.messageReqUserDetail);

// new message
// add read route to allow user read message
router.post(
  "/",
  permissions(["admin"]),
  validate(messageSchema),
  MessageController.messageCreate
);

// update message
router.put(
  "/:id",
  permissions(["admin"]),
  validate(messageUpdateSchema),
  matchId,
  MessageController.messageUpdate
);

// read message
router.post("/:id/read", matchId, MessageController.messageReqUserMarkRead);

// delete message
router.delete(
  "/:id",
  permissions(["admin"]),
  matchId,
  MessageController.messageDelete
);

module.exports = router;
