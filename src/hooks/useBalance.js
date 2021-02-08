import { useAdminUserTransactions, useTransactions } from "./useTransactions";

import * as reducers from "../utils/balanceReducers";

export const useBalance = () => {
  const { transactions, loading } = useTransactions();

  const total = reducers.total(transactions);
  const available = reducers.available(transactions);
  const bonus = reducers.bonus(transactions);
  const deposit = reducers.deposit(transactions);
  const profit = reducers.profit(transactions);

  return { total, available, bonus, deposit, profit, loading };
};

export const useWalletBalance = (symbol) => {
  const { transactions, loading } = useTransactions();

  const walletTransactions = transactions?.filter(
    (tx) => tx.wallet.toLowerCase() === symbol?.toLowerCase()
  );

  const total = reducers.total(walletTransactions);
  const available = reducers.available(walletTransactions);

  return { total, available, loading };
};

export const useAdminBalance = (userId) => {
  const { transactions, loading } = useAdminUserTransactions(userId);

  const total = reducers.total(transactions);
  const available = reducers.available(transactions);
  const bonus = reducers.bonus(transactions);
  const deposit = reducers.deposit(transactions);
  const profit = reducers.profit(transactions);

  return { total, available, bonus, deposit, profit, loading };
};

export const useAdminWalletBalance = (userId, symbol) => {
  const { transactions, loading } = useAdminUserTransactions(userId);

  const walletTransactions = transactions?.filter(
    (tx) => tx.wallet.toLowerCase() === symbol.toLowerCase()
  );

  const total = reducers.total(walletTransactions);
  const available = reducers.available(walletTransactions);

  return { total, available, loading };
};
