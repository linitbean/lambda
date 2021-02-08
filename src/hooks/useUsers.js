import useSWR from "swr";
import axiosInstance from "../utils/axios";

const fetchWithSearch = (url, search) =>
  axiosInstance
    .get(url, { params: { search: search || undefined } })
    .then((res) => res.data);

export const useAdminUsers = (searchValue) => {
  const { data: users, mutate, error } = useSWR(
    ["/users", searchValue],
    fetchWithSearch
  );

  const loading = !users && !error;

  return { users, loading, error, mutate };
};

export const useAdminUser = (userId) => {
  const { data: user, mutate, error } = useSWR("/users/" + userId);

  const loading = !user && !error;

  return { user, loading, error, mutate };
};
