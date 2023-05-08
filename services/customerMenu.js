export const customerMenu = [
  {
    id: 1,
    label: "menuitems.navigation.text",
    isTitle: true,
  },
  {
    id: 2,
    label: "menuitems.dashboard.text",
    icon: "ri-dashboard-line",
    badge: {
      variant: "success",
      text: "menuitems.dashboard.badge",
    },
    isMenuCollapsed: false,
    subItems: [
      {
        id: 3,
        label: "menuitems.dashboard.list.sales",
        link: "/",
      },
      {
        id: 4,
        label: "menuitems.dashboard.list.crm",
        link: "/dashboard/crm",
      },
    ],
  },
  {
    id: 100,
    label: "menuitems.setting.text",
    isTitle: true,
  },
  {
    id: 101,
    label: "menuitems.setting.text",
    icon: " ri-settings-4-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 102,
        label: "menuitems.setting.list.profile",
        link: "/customer/setting/profile",
      },
    ],
  },
];
