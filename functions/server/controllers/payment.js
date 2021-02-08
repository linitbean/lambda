const createError = require("http-errors");

const Payment = require("../models/payment");

const paymentList = (req, res, next) => {
  try {
    // add query result to response
    res.query = Payment.find().sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const paymentUserList = (req, res, next) => {
  try {
    const user = req.params.userId;
    // add query result to response
    res.query = Payment.find({ user }).sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const paymentReqUserList = (req, res, next) => {
  try {
    const user = req.user.id;
    // add query result to response
    res.query = Payment.find({ user, completed: false }).sort("-date");
    next();
  } catch (err) {
    next(err);
  }
};

const paymentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const payment = await Payment.findById(id);
    if (!payment) throw createError.NotFound("Payment not found");

    res.json(payment);
  } catch (err) {
    next(err);
  }
};

const paymentReqUserDetail = async (req, res, next) => {
  try {
    const user = req.user.id;
    const _id = req.params.id;

    const payment = await Payment.findOne({ _id, user });
    if (!payment) throw createError.NotFound("Payment not found");

    res.json(payment);
  } catch (err) {
    next(err);
  }
};

const paymentCreate = async (req, res, next) => {
  try {
    // validated request body
    const result = req.body;

    // create new payment
    const payment = new Payment(result);
    const savedPayment = await payment.save();

    res.json(savedPayment);
  } catch (err) {
    next(err);
  }
};

const paymentUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;

    // validated request body
    const result = req.body;

    // update payment
    const updatedPayment = await Payment.findByIdAndUpdate(id, result, {
      new: true,
    });
    if (!updatedPayment) return next(createError.NotFound("Payment not found"));

    res.json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

const paymentDelete = async (req, res, next) => {
  try {
    const id = req.params.id;

    // delete payment
    const deletedPayment = await Payment.findByIdAndDelete(id);
    if (!deletedPayment) throw createError.NotFound("Payment not found");

    res.json({ message: "Payment successfully deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  paymentList,
  paymentUserList,
  paymentReqUserList,
  paymentDetail,
  paymentReqUserDetail,
  paymentCreate,
  paymentUpdate,
  paymentDelete,
};
