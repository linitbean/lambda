const createError = require("http-errors");

const Wallet = require("../models/wallet");

const walletList = (req, res, next) => {
  try {
    // add query result to response
    res.query = Wallet.find();
    next();
  } catch (err) {
    next(err);
  }
};

const walletCreate = async (req, res, next) => {
  try {
    // validate request body
    const result = req.body;

    // check if wallet already exists
    const doesExistName = await Wallet.findOne({
      name: result.name,
    });
    const doesExistSymbol = await Wallet.findOne({
      symbol: result.symbol,
    });

    if (doesExistName || doesExistSymbol)
      throw createError.Conflict("Wallet already exist");

    // create new wallet
    const wallet = new Wallet(result);
    const savedWallet = await wallet.save();

    res.json(savedWallet);
  } catch (err) {
    next(err);
  }
};

const walletDetail = async (req, res, next) => {
  try {
    const symbol = req.params.symbol;

    const wallet = await Wallet.findOne({ symbol });

    if (!wallet) return next(createError.NotFound("Wallet not found"));

    res.json(wallet);
  } catch (err) {
    next(err);
  }
};

const walletUpdate = async (req, res, next) => {
  try {
    const symbol = req.params.symbol;

    // validate request body
    const result = req.body;

    // update wallet
    const wallet = await Wallet.findOneAndUpdate({ symbol }, result, {
      new: true,
    });
    if (!wallet) return next(createError.NotFound("Wallet not found"));

    res.json(wallet);
  } catch (err) {
    next(err);
  }
};

const walletDelete = async (req, res, next) => {
  try {
    const symbol = req.params.symbol;

    // delete wallet
    const deletedWallet = await Wallet.findOneAndDelete({ symbol });
    if (!deletedWallet) return next(createError.NotFound("Wallet not found"));

    res.json({ message: "Wallet successfully deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  walletList,
  walletCreate,
  walletDetail,
  walletUpdate,
  walletDelete,
};
