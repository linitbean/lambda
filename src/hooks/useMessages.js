import useSWR from "swr";

export const useMessages = () => {
  const { data: messages, mutate, error } = useSWR("/messages");

  const loading = !messages && !error;

  return { messages, loading, error, mutate };
};

export const useMessage = (id) => {
  const { data: message, mutate, error } = useSWR("/messages/" + id);

  const loading = !message && !error;

  return { message, loading, error, mutate };
};

export const useAdminUserMessages = (userId) => {
  const { data: messages, mutate, error } = useSWR(
    "/messages/admin/user/" + userId
  );

  const loading = !messages && !error;

  return { messages, loading, error, mutate };
};

export const useAdminMessage = (id) => {
  const { data: message, mutate, error } = useSWR("/messages/admin/" + id);

  const loading = !message && !error;

  return { message, loading, error, mutate };
};
