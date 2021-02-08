import useSWR from "swr";

export const useTransactions = () => {
  const { data: transactions, mutate, error } = useSWR("/transactions");

  const loading = !transactions && !error;

  const investments = transactions?.filter((tx) => tx.type === "investment");

  return {
    transactions,
    investments,
    loading,
    error,
    mutate,
  };
};

export const useTransaction = (id) => {
  const { data: transaction, mutate, error } = useSWR("/transactions/" + id);

  const loading = !transaction && !error;

  return { transaction, loading, error, mutate };
};

export const useAdminTransactions = () => {
  const { data: transactions, mutate, error } = useSWR("/transactions/admin");

  const loading = !transactions && !error;

  const investments = transactions?.filter((tx) => tx.type === "investment");

  return {
    transactions,
    investments,
    loading,
    error,
    mutate,
  };
};

export const useAdminUserTransactions = (userId) => {
  const { data: transactions, mutate, error } = useSWR(
    "/transactions/admin/user/" + userId
  );

  const loading = !transactions && !error;

  return {
    transactions,
    loading,
    error,
    mutate,
  };
};

export const useAdminTransaction = (id) => {
  const { data: transaction, mutate, error } = useSWR(
    "/transactions/admin/" + id
  );

  const loading = !transaction && !error;

  return { transaction, loading, error, mutate };
};
