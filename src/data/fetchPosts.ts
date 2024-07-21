const BASE_URL = "https://jsonplaceholder.typicode.com";

export type TPaginationResponse<T> = {
  items: T[];
  count: number;
};

export type TPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export const fetchPosts = async (
  start: number,
  limit: number
): Promise<TPaginationResponse<TPost>> => {
  const queryString = `?_start=${start}&_limit=${limit}`;

  const result = await fetch(`${BASE_URL}/posts${queryString}`);

  return {
    items: await result.json(),
    count: Number(result.headers.get("x-total-count")),
  };
};
