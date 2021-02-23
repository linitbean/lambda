import useSWR from "swr";
// import { getUnixTime } from "date-fns";

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

// export const useInvestmentKlines = (investment) => {
//   const walletId = getWalletId(investment.wallet);

//   const startDay = new Date(investment.date);

//   const difference =
//     (new Date().getTime() - startDay.getTime()) / (1000 * 3600 * 24);

//   if (difference < 1) startDay.setDate(startDay.getDate() - 1);

//   const from = getUnixTime(startDay);
//   const to = getUnixTime(new Date());

//   const { data } = useSWR(
//     `/${walletId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
//     fetchCoinGecko,
//     {
//       dedupingInterval: 10000,
//     }
//   );

//   const klines = data ? data["prices"].map((price) => price[1]) : [0, 0];

//   return { klines };
// };
