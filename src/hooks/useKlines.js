import useSWR from "swr";

import axiosInstance from "../utils/axios";

import { getWalletId } from "../store/supportedWallets";

const fetchCoinGecko = (url) => {
  const coingecko = "https://api.coingecko.com/api/v3/coins";
  return axiosInstance.get(coingecko + url).then((res) => res.data);
};

export const useKlines = (symbol, days = 1) => {
  const walletId = getWalletId(symbol);

  const { data } = useSWR(
    `/${walletId}/market_chart?vs_currency=usd&days=${days}`,
    fetchCoinGecko,
    {
      dedupingInterval: 10000,
    }
  );

  const klines = data ? data["prices"].map((price) => price[1]) : [0, 0];

  return { klines };
};
