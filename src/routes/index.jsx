import { lazy } from "react";
import Loadable from "./Loadable";
import { AuthRoutes } from "./auth";
import { DashboardRoutes } from "./dashboard";
import ProtectedRoute from "hoc/ProtectedRoute";
import CheckConnectExchange from "hoc/CheckConnectExchange";
import ConnectAccountPage from "pages/connect-exchange/connect-exchange";
import { Navigate } from "react-router-dom";
import CheckConnectExchangeConnect from "hoc/CheckConnectExchangeConnect";
import ProtectedRouteConnect from "hoc/ProtectedRouteConnect";
import ErrorBoundary from "ErrorBoundary";

const ErrorPage = Loadable(lazy(() => import("pages/404")));
// const Landing = Loadable(lazy(() => import("pages/landing")));
export const routes = () => {
  return [
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <ProtectedRoute>
            <CheckConnectExchange>
              {/* <Landing /> */}
              <Navigate to="/dashboard" />
            </CheckConnectExchange>
          </ProtectedRoute>
        </ErrorBoundary>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/connect",
      element: (
        <ProtectedRouteConnect>
          <CheckConnectExchangeConnect>
            <ConnectAccountPage />
          </CheckConnectExchangeConnect>
        </ProtectedRouteConnect>
      ),
    },
    ...AuthRoutes,
    ...DashboardRoutes,
  ];
};
