import { useApiQuery } from "../../services/api/secured.api";

export const useLogin = () => {
  const result = useApiQuery({
    url: "/auth/signin",
    method: "POST",
    body: { email: "baba@baba.com", password: "123456" },
    options: {},
  });
  return result;
};
