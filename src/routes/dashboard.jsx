import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
// import { AuthGuard } from "components/auth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import ProtectedRoute from "hoc/ProtectedRoute";
import CheckConnectExchange from "hoc/CheckConnectExchange";
import { SignalStrategyProvider } from "contexts/SignalStrategyContext";
import { AllMailPageView } from "page-sections/signal-strategy/page-view";
import InboxPage from "pages/dashboard/signal-strategy/inbox";
import ComposeMailPage from "pages/dashboard/signal-strategy/compose";
import Sent from "pages/dashboard/signal-strategy/sent";
import SignalStrategyList from "page-sections/signal-strategy/page-view/all";
import { PortfoliosProvider } from "contexts/PortfoliosContext";
import PortfolioDetail from "page-sections/portfolios/page-view/detail";
import Dashboard from "pages/dashboard/dashboard";
import ManualTradeProvider from "contexts/ManualTradeContext";
import Portfolio from "page-sections/profile/overview/Portfolio";
import PortfoliosList from "page-sections/portfolios/page-view/all";
import ManualTradePage from "page-sections/manual-trade";
import ManageFollowerPage from "page-sections/manage-follower";
import ManualFollowerProvider from "contexts/ManageFollowerContext";
import ManageFollowerProvider from "contexts/ManageFollowerContext";
import TopSignal from "pages/dashboard/signal-strategy/inbox";
import TelegramChannelPage from "pages/dashboard/signal-strategy/sent";
// ALL DASHBOARD PAGES
const CRM = Loadable(lazy(() => import("pages/dashboard/crm")));
const Finance = Loadable(lazy(() => import("pages/dashboard/finance")));
const FinanceV2 = Loadable(lazy(() => import("pages/dashboard/finance-2")));
const BudgetStrategy = Loadable(
  lazy(() => import("pages/dashboard/budget-strategy"))
);
const Logistics = Loadable(lazy(() => import("pages/dashboard/logistics")));
const Marketing = Loadable(lazy(() => import("pages/dashboard/marketing")));

// USER LIST PAGES
const AddNewUser = Loadable(
  lazy(() => import("pages/dashboard/users/add-new-user"))
);
const UserListView = Loadable(
  lazy(() => import("pages/dashboard/users/user-list-1"))
);
const UserGridView = Loadable(
  lazy(() => import("pages/dashboard/users/user-grid-1"))
);
const UserListView2 = Loadable(
  lazy(() => import("pages/dashboard/users/user-list-2"))
);
const UserGridView2 = Loadable(
  lazy(() => import("pages/dashboard/users/user-grid-2"))
);

// USER ACCOUNT PAGE
const Account = Loadable(lazy(() => import("pages/dashboard/accounts")));

// ALL INVOICE RELATED PAGES
const InvoiceList = Loadable(
  lazy(() => import("pages/dashboard/invoice/list"))
);
const InvoiceCreate = Loadable(
  lazy(() => import("pages/dashboard/invoice/create"))
);
const InvoiceDetails = Loadable(
  lazy(() => import("pages/dashboard/invoice/details"))
);

// PRODUCT RELATED PAGES
const ProductList = Loadable(
  lazy(() => import("pages/dashboard/products/list"))
);
const ProductGrid = Loadable(
  lazy(() => import("pages/dashboard/products/grid"))
);
const ProductCreate = Loadable(
  lazy(() => import("pages/dashboard/products/create"))
);
const ProductDetails = Loadable(
  lazy(() => import("pages/dashboard/products/details"))
);

// E-COMMERCE RELATED PAGES
const Cart = Loadable(lazy(() => import("pages/dashboard/ecommerce/cart")));
const Payment = Loadable(
  lazy(() => import("pages/dashboard/ecommerce/payment"))
);
const BillingAddress = Loadable(
  lazy(() => import("pages/dashboard/ecommerce/billing-address"))
);
const PaymentComplete = Loadable(
  lazy(() => import("pages/dashboard/ecommerce/payment-complete"))
);

// USER PROFILE PAGE
const Profile = Loadable(lazy(() => import("pages/dashboard/profile")));

// REACT DATA TABLE PAGE
const DataTable1 = Loadable(
  lazy(() => import("pages/dashboard/data-tables/table-1"))
);

// OTHER BUSINESS RELATED PAGES
const Career = Loadable(lazy(() => import("pages/career/career-1")));
const CareerApply = Loadable(lazy(() => import("pages/career/apply")));
const About = Loadable(lazy(() => import("pages/about-us/about-us-2")));
const FileManager = Loadable(
  lazy(() => import("pages/dashboard/file-manager"))
);

// SUPPORT RELATED PAGES
const Support = Loadable(lazy(() => import("pages/dashboard/support/support")));
const CreateTicket = Loadable(
  lazy(() => import("pages/dashboard/support/create-ticket"))
);

// CHAT PAGE
const Chat = Loadable(lazy(() => import("pages/dashboard/chat")));

// USER TODO LIST PAGE
const TodoList = Loadable(lazy(() => import("pages/dashboard/todo-list")));

// MAIL RELATED PAGES
const MailDetails = Loadable(
  lazy(() => import("pages/dashboard/signal-strategy/details"))
);
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
        path: "crm",
        element: <CRM />,
      },
      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "finance-2",
        element: <FinanceV2 />,
      },
      {
        path: "budget-strategies",
        element: <BudgetStrategy />,
      },
      {
        path: "logistics",
        element: <Logistics />,
      },
      {
        path: "marketing",
        element: <Marketing />,
      },
      // {
      //   path: "portfolios",
      //   element: <Portfolios />,
      // },
      {
        path: "add-user",
        element: <AddNewUser />,
      },
      {
        path: "user-list",
        element: <UserListView />,
      },
      {
        path: "user-grid",
        element: <UserGridView />,
      },
      {
        path: "user-list-2",
        element: <UserListView2 />,
      },
      {
        path: "user-grid-2",
        element: <UserGridView2 />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "invoice-list",
        element: <InvoiceList />,
      },
      {
        path: "create-invoice",
        element: <InvoiceCreate />,
      },
      {
        path: "invoice-details",
        element: <InvoiceDetails />,
      },
      {
        path: "product-list",
        element: <ProductList />,
      },
      {
        path: "product-grid",
        element: <ProductGrid />,
      },
      {
        path: "create-product",
        element: <ProductCreate />,
      },
      {
        path: "product-details",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "billing-address",
        element: <BillingAddress />,
      },
      {
        path: "payment-complete",
        element: <PaymentComplete />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "data-table-1",
        element: <DataTable1 />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "career",
        element: <Career />,
      },
      {
        path: "career-apply",
        element: <CareerApply />,
      },
      {
        path: "file-manager",
        element: <FileManager />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "create-ticket",
        element: <CreateTicket />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "todo-list",
        element: <TodoList />,
      },
      {
        path: "mail",
        children: [
          {
            path: "all",
            element: <AllMailPageView />,
          },
          {
            path: "inbox",
            element: <InboxPage />,
          },
          {
            path: "sent",
            element: <Sent />,
          },
          {
            path: "compose",
            element: <ComposeMailPage />,
          },
          {
            path: "details",
            element: <MailDetails />,
          },
        ],
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
            element: <InboxPage />,
          },
          {
            path: "schedule",
            element: <Sent />,
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
