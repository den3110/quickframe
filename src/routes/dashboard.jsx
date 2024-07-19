import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
// import { AuthGuard } from "components/auth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import ProtectedRoute from "hoc/ProtectedRoute";
import CheckConnectExchange from "hoc/CheckConnectExchange";
import { SignalStrategyProvider } from "contexts/SignalStrategyContext";
import SignalStrategyList from "page-sections/signal-strategy/page-view/all";
import { PortfoliosProvider } from "contexts/PortfoliosContext";
import PortfolioDetail from "page-sections/portfolios/page-view/detail";
import Dashboard from "pages/dashboard/dashboard";
import ManualTradeProvider from "contexts/ManualTradeContext";
import PortfoliosList from "page-sections/portfolios/page-view/all";
import ManualTradePage from "page-sections/manual-trade";
import ManageFollowerPage from "page-sections/manage-follower";
import ManageFollowerProvider from "contexts/ManageFollowerContext";
import TopSignal from "pages/dashboard/signal-strategy/inbox";
import TelegramChannelPage from "pages/dashboard/signal-strategy/sent";
import StatPortfolio from "page-sections/portfolios/page-view/stat";
// ALL DASHBOARD PAGES
const BudgetStrategy = Loadable(
  lazy(() => import("pages/dashboard/budget-strategy"))
);

// USER ACCOUNT PAGE
const Account = Loadable(lazy(() => import("pages/dashboard/accounts")));

// USER PROFILE PAGE
const Profile = Loadable(lazy(() => import("pages/dashboard/profile")));

export const DashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <CheckConnectExchange>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </CheckConnectExchange>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "budget-strategies",
        element: <BudgetStrategy />,
      },
      // {
      //   path: "portfolios",
      //   element: <Portfolios />,
      // },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "signal-strategies",
        element: (
          <SignalStrategyProvider>
            <Outlet />
          </SignalStrategyProvider>
        ),
        children: [
          {
            path: "",
            element: <SignalStrategyList />,
          },
          {
            path: "top-signal",
            element: <TopSignal />,
          },
          {
            path: "telegram-channel",
            element: <TelegramChannelPage />,
          },
          {
            path: ":id",
            element: <PortfolioDetail />,
          },
        ],
      },
      {
        path: "portfolios",
        element: (
          <PortfoliosProvider>
            <Outlet />
          </PortfoliosProvider>
        ),
        children: [
          {
            path: "",
            element: <PortfoliosList />,
          },
          {
            path: "statistic",
            element: <StatPortfolio />,
          },
          {
            path: ":id",
            element: <PortfolioDetail />,
          },
        ],
      },
      {
        path: "manual-trade",
        element: (
          <ManualTradeProvider>
            <Outlet />
          </ManualTradeProvider>
        ),
        children: [
          {
            path: "",
            element: <ManualTradePage />,
          },
        ],
      },
      {
        path: "manage-follower",
        element: (
          <ManageFollowerProvider>
            <Outlet />
          </ManageFollowerProvider>
        ),
        children: [
          {
            path: "",
            element: <ManageFollowerPage />,
          },
        ],
      },
    ],
  },
];
