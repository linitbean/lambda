const createError = require("http-errors");

const Message = require("../models/message");

const messageList = (req, res, next) => {
  try {
    // add query result to response
    res.query = Message.find().sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const messageUserList = (req, res, next) => {
  try {
    const user = req.params.userId;
    // add query result to response
    res.query = Message.find({ user }).sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const messageReqUserList = (req, res, next) => {
  try {
    const user = req.user.id;
    // add query result to response
    res.query = Message.find({ user }).sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const messageDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const message = await Message.findById(id);
    if (!message) return next(createError.NotFound("Message not found"));

    res.json(message);
  } catch (err) {
    next(err);
  }
};

const messageReqUserDetail = async (req, res, next) => {
  try {
    const user = req.user.id;
    const _id = req.params.id;

    const message = await Message.findOne({ _id, user });
    if (!message) return next(createError.NotFound("Message not found"));

    res.json(message);
  } catch (err) {
    next(err);
  }
};

const messageCreate = async (req, res, next) => {
  try {
    // validated request body
    const result = req.body;

    // create new message
    const message = new Message(result);
    const savedMessage = await message.save();

    res.json(savedMessage);
  } catch (err) {
    next(err);
  }
};

const messageUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;

    // validated request body
    const result = req.body;

    // update message
    const updatedMessage = await Message.findByIdAndUpdate(id, result, {
      new: true,
    });
    if (!updatedMessage) return next(createError.NotFound("Message not found"));

    res.json(updatedMessage);
  } catch (err) {
    next(err);
  }
};

const messageReqUserMarkRead = async (req, res, next) => {
  try {
    const user = req.user.id;
    const _id = req.params.id;

    const message = await Message.findOne({ _id, user });
    if (!message) return next(createError.NotFound("Message not found"));

    let savedMessage;

    if (!message.read) {
      message.read = true;
      savedMessage = await message.save();
    }

    res.json(savedMessage || message);
  } catch (err) {
    next(err);
  }
};

const messageDelete = async (req, res, next) => {
  try {
    const id = req.params.id;

    // delete message
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return next(createError.NotFound("Message not found"));

    res.json({ message: "Message successfully deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  messageList,
  messageUserList,
  messageReqUserList,
  messageDetail,
  messageReqUserDetail,
  messageReqUserMarkRead,
  messageCreate,
  messageUpdate,
  messageDelete,
};
