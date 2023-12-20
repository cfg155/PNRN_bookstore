import { useApiQuery } from "../../services/api/secured.api";
import { TResponse } from "../../services/api/types";

export const useLogin = () => {
  const result = useApiQuery<TResponse<{ message: string }>>({
    url: "/auth/signin",
    method: "POST",
    body: { email: "baba@baba.com", password: "123456" },
    options: {
      onSuccess: async (data) => {
        const token = data.headers.get("access_token");

        if (!token) return console.error("Token doesn't exist");
        window.localStorage.setItem("accessToken", token);
      },
    },
  });

  return result;
};
