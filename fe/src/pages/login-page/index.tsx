import React, { ChangeEvent } from "react";
import { useLogin } from "./api";

const LoginPage: React.FC = () => {
  const { refetch } = useLogin();
  const [data, setData] = React.useState({ email: "", password: "" });

  const onChange = (
    event: ChangeEvent & { target: { name: string; value: string } }
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <input type="email" name="email" onChange={onChange} />
      <input type="password" name="password" onChange={onChange} />
      <button onClick={() => refetch()}>Submit</button>
    </div>
  );
};

export default LoginPage;
