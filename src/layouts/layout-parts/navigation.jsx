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
    name: "Bảng điều khiển",
    path: "/dashboard/",
    icon: duotone.DashboardIcon,
    type: "intLink",
  },
  {
    name: "Gói đầu tư",
    path: "/portfolios",
    icon: duotone.Portfolios,
    badgeContent: 2,
    type: "intLink",
  },
  {
    name: "Chiến lược vốn",
    path: "/budget-strategies",
    icon: duotone.BudgetStrategy,
    type: "intLink",
  },
  {
    name: "Chiến lược tín hiệu",
    path: "/signal-strategies",
    icon: duotone.SignalStrategy,
    type: "intLink",
  },
  {
    type: "divider",
  },
  {
    name: "Thống kê người theo",
    icon: duotone.Follower,
    path: "/manage-follower",
    type: "intLink",
  },
  {
    name: "Giao dịch thủ công",
    icon: duotone.ManualTrade,
    path: "/manual-trade",
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
