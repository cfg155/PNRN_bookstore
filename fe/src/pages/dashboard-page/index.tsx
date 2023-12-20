import React from "react";
import { useQuery } from "react-query";

const DashboardPage: React.FC<any> = (props) => {
  const data = useQuery("/books");

  return <div>DashboardPage</div>;
};

export default DashboardPage;
