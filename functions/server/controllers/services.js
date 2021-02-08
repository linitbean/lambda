const User = require("../models/user");
const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");

const { customMail } = require("../utils/mailer");

const statistics = async (req, res, next) => {
  try {
    const users = await User.estimatedDocumentCount();
    const transactions = await Transaction.estimatedDocumentCount();
    const wallets = await Wallet.estimatedDocumentCount();

    res.json({ count: { users, transactions, wallets } });
  } catch (err) {
    next(err);
  }
};

const sendMail = async (req, res, next) => {
  try {
    // validated request body
    const result = req.body;

    await customMail(result);

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
};

const inboundMail = async (req, res, next) => {
  try {
    const ctx = req.body;

    await customMail(result);

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { statistics, sendMail };
