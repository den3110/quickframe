// CUSTOM ICON COMPONENT
import duotone from "icons/duotone";

// type ChildItem = { name: string; path: string };

// type ChildItemWithChildren = {
//   name: string;
//   path: string;
//   children?: ChildItemWithChildren[];
// };
export const navigations = [
  {
    type: "label",
    label: "Menu",
  },
  {
    name: "Dashboard",
    path: "/dashboard/",
    icon: duotone.DashboardIcon,
    type: "intLink",
  },
  {
    name: "Portfolio",
    path: "/dashboard/portfolios",
    icon: duotone.Portfolios,
    badgeContent: 2,
    type: "intLink",
  },
  {
    name: "Budget Strategy",
    path: "/dashboard/budget-strategies",
    icon: duotone.BudgetStrategy,
    type: "intLink",
  },
  {
    name: "Signal Strategy",
    path: "/dashboard/signal-strategies",
    icon: duotone.SignalStrategy,
    type: "intLink",
  },
  {
    type: "divider",
  },
  {
    name: "Management Follower",
    icon: duotone.Follower,
    path: "/dashboard/manage-follower",
    type: "intLink",
  },
  {
    name: "Manual Trade",
    icon: duotone.ManualTrade,
    path: "/dashboard/manual-trade",
    type: "intLink",
  },
  // {
  //   name: "Referral",
  //   icon: duotone.Introduction,
  //   path: "/dashboard/referral",
  // },
  // {
  //   name: "Vip Member",
  //   icon: duotone.VipMember,
  //   path: "/dashboard/account",
  // },
];
