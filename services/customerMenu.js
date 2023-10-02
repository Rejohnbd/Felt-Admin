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
    id: 5,
    label: "menuitems.vehicle.text",
    isTitle: true,
  },
  {
    id: 6,
    label: "menuitems.vehicles.text",
    icon: "ri-car-fill",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 7,
        label: "menuitems.vehicles.list.all-vehicle",
        link: "/customer/vehicles",
      },
    ],
  },
  {
    id: 8,
    label: "menuitems.drivers.text",
    icon: "ri-group-fill",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 9,
        label: "menuitems.drivers.list.all-driver",
        link: "/customer/drivers",
      },
    ],
  },
  {
    id: 10,
    label: "menuitems.map.text",
    icon: "ri-map-pin-line",
    link: "/customer/map",
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
