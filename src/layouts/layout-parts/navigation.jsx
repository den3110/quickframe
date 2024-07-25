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
    name: "dashboard",
    path: "/dashboard/",
    icon: duotone.DashboardIcon,
    type: "intLink",
  },
  {
    name: "portfolios",
    path: "/portfolios",
    icon: duotone.Portfolios,
    badgeContent: 2,
    type: "intLink",
  },
  {
    name: "budget_strategy",
    path: "/budget-strategies",
    icon: duotone.BudgetStrategy,
    type: "intLink",
  },
  {
    name: "signal_strategy",
    path: "/signal-strategies",
    icon: duotone.SignalStrategy,
    type: "intLink",
  },
  {
    type: "divider",
  },
  {
    name: "manage_followers",
    icon: duotone.Follower,
    path: "/manage-follower",
    type: "intLink",
  },
  {
    name: "manual_trade",
    icon: duotone.ManualTrade,
    path: "/manual-trade",
    type: "intLink",
  },
  // {
  //   name: "Referral",
  //   icon: duotone.Introduction,
  //   path: "/referral",
  // },
  {
    name: "vip_member",
    icon: duotone.VipMember,
    path: "/vip-member",
  },
];
