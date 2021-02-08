const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
