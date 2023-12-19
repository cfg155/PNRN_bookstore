import {
  QueryClient,
  QueryKey,
  QueryObserverOptions,
  QueryOptions,
  useQuery,
} from "react-query";

export const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const HEADER_OPTIONS = {
    "Content-Type": "application/json",
    ...(queryKey[4] as object),
  };

  const options: RequestInit = {
    method: (queryKey[1] as string | undefined) || "GET",
    body: JSON.stringify(queryKey[3]) || null,
    headers: HEADER_OPTIONS,
  };

  if (!options.body) delete options.body;

  const res = await fetch(
    `http://localhost:3000${queryKey[0]}`,
    options as RequestInit
  ).then((res) => res);

  if (!res.ok) throw new Error("Network response was not ok");
  return res;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const useApiQuery = ({
  url,
  method,
  body,
  params,
  headers,
  options,
}: {
  url: string;
  method?: "GET" | "POST";
  body?: unknown;
  headers?: HeadersInit;
  params?: object;
  options?: QueryOptions & QueryObserverOptions;
}) => {
  method = method || "GET";

  const result = useQuery([url, method, params, body, headers], {
    enabled: method === "POST" ? false : true,
    ...options,
  } as QueryOptions);
  return result;
};
