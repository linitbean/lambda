const Transaction = require("../models/transaction");

const cascade = async (transaction) => {
  if (transaction.type === "transfer") {
    await Transaction.deleteOne({
      source: transaction.id,
    });
  }
};

const concurrency = async (transaction) => {
  if (transaction.type === "transfer") {
    await Transaction.findOneAndUpdate(
      {
        source: transaction.id,
      },
      {
        wallet: transaction.wallet,
        amount: Math.abs(transaction.amount),
        description: `You received $${Math.abs(transaction.amount)} ${
          transaction.wallet
        }`,
        date: transaction.date,
      }
    );
  }
};

const transferactivity = async (transaction) => {
  if (transaction.type === "transfer") {
    const receiverIncome = new Transaction({
      type: "income",
      wallet: transaction.wallet,
      amount: Math.abs(transaction.amount),
      description: `You received $${Math.abs(transaction.amount)} ${
        transaction.wallet
      }`,
      date: transaction.date,
      user: transaction.receiver,
      source: transaction.id,
    });

    await receiverIncome.save();
  }
};

module.exports = { cascade, concurrency, transferactivity };
