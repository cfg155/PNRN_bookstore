import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login-page";
import DashboardPage from "../pages/dashboard-page";
import SecuredRoute from "./secured-route";

export const PUBLIC_ROUTES: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <LoginPage /> },
];

export const SECURED_ROUTES: RouteObject[] = [
  { path: "/dashboard", element: <DashboardPage /> },
];

const securedRouteLoader = () => {};

const router = createBrowserRouter([
  ...PUBLIC_ROUTES,
  {
    element: <SecuredRoute />,
    loader: (props) => {
      return "woi";
    },
    children: SECURED_ROUTES,
  },
]);

export default router;
