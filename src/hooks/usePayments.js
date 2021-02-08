import useSWR from "swr";

export const usePayments = () => {
  const { data: payments, mutate, error } = useSWR("/payments");

  const loading = !payments && !error;

  return { payments, loading, error, mutate };
};

export const useAdminUserPayments = (userId) => {
  const { data: payments, mutate, error } = useSWR(
    "/payments/admin/user/" + userId
  );

  const loading = !payments && !error;

  return { payments, loading, error, mutate };
};

export const useAdminPayment = (id) => {
  const { data: payment, mutate, error } = useSWR("/payments/admin/" + id);

  const loading = !payment && !error;

  return { payment, loading, error, mutate };
};
