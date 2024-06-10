import useSWR from "swr";

export const useData = (url) => {
  const { data, error } = useSWR(url, async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
