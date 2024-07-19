import { lazy } from "react";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";

// const Home = Loadable(lazy(() => import("pages/home")));

// ROLE BASED PERMISSION TEST PAGE

// FEATURES RELATED PAGES
const Maintenance = Loadable(lazy(() => import("pages/maintenance")));
export const PublicRoutes = [
  // { path: "home", element: <Home /> },
  {
    path: "maintenance",
    element: <Maintenance />,
  },
];
