import { lazy } from "react";
import Loadable from "./Loadable";
import { AuthRoutes } from "./auth";
import { PublicRoutes } from "./public";
import { DashboardRoutes } from "./dashboard";
import { ComponentRoutes } from "./components";
import ProtectedRoute from "hoc/ProtectedRoute";
import ConnectAccountPage from "pages/connect-exchange";

const ErrorPage = Loadable(lazy(() => import("pages/404")));
const Landing = Loadable(lazy(() => import("pages/landing")));
export const routes = () => {
  return [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Landing />
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
          <ConnectAccountPage />
        </ProtectedRoute>
      ),
    },
    ...AuthRoutes,
    ...ComponentRoutes,
    ...DashboardRoutes,
    ...PublicRoutes,
  ];
};
