import useSWR from "swr";

export const useStats = () => {
  const { data: stats, error } = useSWR("/core/statistics");

  const loading = !stats && !error;

  return { stats, loading };
};
