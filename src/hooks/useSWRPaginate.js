import { useSWRInfinite } from "swr";

const getKey = (pageIndex, prev) => {
  // console.log(pageIndex, prev);

  // if (previousPageData && !previousPageData.cursor?.next) return null;

  return `activities?format=paginate&page=${pageIndex + 1}&limit=3`;
};

export const useSWRPaginate = () => {
  const { data: results, size, setSize, mutate, error } = useSWRInfinite(
    getKey,
    {
      initialSize: 3,
    }
  );

  const data = results?.docs ? [].concat(...results.docs) : [];

  //   console.log({ data, size });
  return { data, size, setSize, mutate, error };
};
