import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login-page";
import DashboardPage from "../pages/dashboard-page";
import SecuredRoute from "./secured-route";
import DetailBook from "../pages/detail-book";

export const PUBLIC_ROUTES: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <LoginPage /> },
];

export const SECURED_ROUTES: RouteObject[] = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/book/:id", element: <DetailBook /> },
];

const securedRouteLoader = () => {
  const token = window.localStorage.getItem("accessToken");
  if (!token) return { authorized: false };
  return { authorized: true };
};

const router = createBrowserRouter([
  ...PUBLIC_ROUTES,
  {
    element: <SecuredRoute />,
    loader: securedRouteLoader,
    children: SECURED_ROUTES,
  },
]);

export default router;
