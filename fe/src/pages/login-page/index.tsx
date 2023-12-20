import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useApiQuery } from "../../services/api/secured.api";
import { TResponse } from "../../services/api/types";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({ email: "", password: "" });
  const { refetch: onLogin } = useApiQuery<TResponse<{ message: string }>>({
    url: "/auth/signin",
    method: "POST",
    body: data,
    options: {
      onSuccess: async (data) => {
        ``;
        const token = data.headers.get("access_token");
        if (!token) throw new Error("Error doesnt exist");
        window.localStorage.setItem("accessToken", token);
        navigate("/dashboard");
      },
      onError: () => {
        console.log("error");
      },
    },
  });

  const onChange = (
    event: ChangeEvent & { target: { name: string; value: string } }
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <input type="email" name="email" onChange={onChange} />
      <input type="password" name="password" onChange={onChange} />
      <button onClick={() => onLogin()}>Submit</button>
    </div>
  );
};

export default LoginPage;
