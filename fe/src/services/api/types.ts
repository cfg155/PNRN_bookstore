export type TQueryKeyPayload = {
  method: "GET" | "POST";
  params: object;
  body: object | null;
  headers: object;
};

export type TResponse<T> = Omit<Response, "json"> & { json: () => Promise<T> };
