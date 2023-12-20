import {
  QueryClient,
  QueryKey,
  QueryObserverOptions,
  QueryOptions,
  UseQueryResult,
  useQuery,
} from "react-query";
import { TQueryKeyPayload } from "./types";

export const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const payload = queryKey as [string, TQueryKeyPayload];
  const HEADER_OPTIONS = {
    "Content-Type": "application/json",
    ...payload[1].headers,
  };

  const options: RequestInit = {
    method: (payload[1].method as string | undefined) || "GET",
    body: JSON.stringify(payload[1].body) || null,
    headers: HEADER_OPTIONS,
  };

  if (!options.body) delete options.body;

  const res = await fetch(
    `http://localhost:3000${payload[0]}`,
    options as RequestInit
  );

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

export const useApiQuery = <T extends object>({
  url,
  method,
  body,
  params,
  headers,
  initiate,
  options,
}: {
  url: string;
  method?: "GET" | "POST";
  body?: unknown;
  headers?: { [key: string]: string };
  params?: object;
  initiate?: boolean;
  options?: QueryOptions & QueryObserverOptions<T, any>;
}) => {
  method = method || "GET";

  const queryKey: QueryKey = [url, { method, params, body, headers }];

  const result: UseQueryResult<T> = useQuery({
    queryKey: queryKey,
    enabled: initiate ? initiate : method === "POST" ? false : true,
    ...options,
  } as QueryOptions);
  return result;
};
