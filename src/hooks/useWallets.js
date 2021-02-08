import useSWR from "swr";

export const useWallets = () => {
  const { data: wallets, mutate, error } = useSWR("/wallets");

  const loading = !wallets && !error;

  return { wallets, loading, error, mutate };
};

export const useWallet = (symbol) => {
  const { data: wallet, mutate, error } = useSWR("/wallets/" + symbol);

  const loading = !wallet && !error;

  return { wallet, loading, error, mutate };
};

export const useAdminUserWallets = (userId) => {
  const { data: wallets, mutate, error } = useSWR(
    "/users/" + userId + "/wallets"
  );

  const loading = !wallets && !error;

  return { wallets, loading, error, mutate };
};

export const useAdminUserWallet = (userId, symbol) => {
  const { data: wallet, mutate, error } = useSWR(
    "/users/" + userId + "/wallets/" + symbol
  );

  const loading = !wallet && !error;

  return { wallet, loading, error, mutate };
};
