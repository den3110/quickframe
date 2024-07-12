import { lazy } from "react";
import Loadable from "./Loadable";
import { GuestGuard } from "components/auth";

const Login = Loadable(lazy(() => import("pages/sessions/login")));
const Register = Loadable(lazy(() => import("pages/sessions/register")));
const VerifyCode = Loadable(lazy(() => import("pages/sessions/verify-code")));
const ForgetPassword = Loadable(
  lazy(() => import("pages/sessions/forget-password"))
);

const LoginDemoWithAuth0 = Loadable(
  lazy(() => import("pages/auth-demo/auth0/login"))
);

const LoginDemoWithAmplify = Loadable(
  lazy(() => import("pages/auth-demo/amplify/login"))
);
const RegisterDemoWithAmplify = Loadable(
  lazy(() => import("pages/auth-demo/amplify/register"))
);
const VerifyDemoWithAmplify = Loadable(
  lazy(() => import("pages/auth-demo/amplify/verify"))
);
export const AuthRoutes = [
  {
    element: <GuestGuard />,
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
  {
    path: "auth0/login",
    element: <LoginDemoWithAuth0 />,
  },
  {
    path: "amplify/login",
    element: <LoginDemoWithAmplify />,
  },
  {
    path: "amplify/register",
    element: <RegisterDemoWithAmplify />,
  },
  {
    path: "amplify/verify",
    element: <VerifyDemoWithAmplify />,
  },
];
