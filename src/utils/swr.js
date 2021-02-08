import axiosInstance from "./axios";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const SWROptions = {
  fetcher,
  shouldRetryOnError: false,
  dedupingInterval: 10000,
};

export default SWROptions;
