import { lazy } from "react";
import Loadable from "./Loadable";
import { AuthRoutes } from "./auth";
import { DashboardRoutes } from "./dashboard";
import ProtectedRoute from "hoc/ProtectedRoute";
import CheckConnectExchange from "hoc/CheckConnectExchange";
import ConnectAccountPage from "pages/connect-exchange/connect-exchange";
import { Navigate } from "react-router-dom";

const ErrorPage = Loadable(lazy(() => import("pages/404")));
// const Landing = Loadable(lazy(() => import("pages/landing")));
export const routes = () => {
  return [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <CheckConnectExchange>
            {/* <Landing /> */}
            <Navigate to="/dashboard" />
          </CheckConnectExchange>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/connect",
      element: (
        <ProtectedRoute>
          <CheckConnectExchange>
            <ConnectAccountPage />
          </CheckConnectExchange>
        </ProtectedRoute>
      ),
    },
    ...AuthRoutes,
    ...DashboardRoutes,
  ];
};
