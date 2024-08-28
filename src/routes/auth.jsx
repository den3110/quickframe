import { lazy } from "react";
import Loadable from "./Loadable";
// import { GuestGuard } from "components/auth";
import { Outlet } from "react-router-dom";
// import ProtectedRoute from "hoc/ProtectedRoute";
// import CheckConnectExchange from "hoc/CheckConnectExchange";
// import DashboardLayout from "layouts/dashboard/DashboardLayout";
import ProtectedRouteLogin from "hoc/ProtectedRouteLogin";
import CheckConnectExchangeLogin from "hoc/CheckConnectExchangeLogin";
import CheckMaintenance from "hoc/CheckMaintainance";

const Login = Loadable(lazy(() => import("pages/sessions/login")));
const Register = Loadable(lazy(() => import("pages/sessions/register")));
const VerifyCode = Loadable(lazy(() => import("pages/sessions/verify-code")));
const ForgetPassword = Loadable(
  lazy(() => import("pages/sessions/forget-password"))
);

export const AuthRoutes = [
  {
    // element: <GuestGuard />,
    element: (
      <CheckMaintenance>
        <ProtectedRouteLogin>
          <CheckConnectExchangeLogin>
            <Outlet />
          </CheckConnectExchangeLogin>
        </ProtectedRouteLogin>
      </CheckMaintenance>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-code",
        element: <VerifyCode />,
      },
    ],
  },
];
