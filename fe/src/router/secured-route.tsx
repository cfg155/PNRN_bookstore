import React from "react";
import { Outlet } from "react-router-dom";

const SecuredRoute: React.FC<any> = (props) => {
  console.log(props);
  return <Outlet />;
};

export default SecuredRoute;
