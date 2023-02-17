export const adminMenu = [
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
        link: "/admin/dashboard/sales",
      },
      {
        id: 4,
        label: "menuitems.dashboard.list.crm",
        link: "/admin/dashboard/crm",
      },
    ],
  },
  {
    id: 5,
    label: "menuitems.user.text",
    isTitle: true,
  },
  {
    id: 6,
    label: "menuitems.users.text",
    icon: "ri-mail-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 7,
        label: "menuitems.users.list.create-user",
        link: "/email/inbox",
      },
      {
        id: 8,
        label: "menuitems.users.list.all-users",
        link: "/email/reademail/1",
      },
    ],
  },
  {
    id: 9,
    label: "menuitems.device.text",
    isTitle: true,
  },
  // {
  //   id: 7,
  //   label: "menuitems.chat.text",
  //   icon: "ri-message-2-line",
  //   link: "/apps/chat",
  // },
  // {
  //   id: 30,
  //   label: "Admin",
  //   icon: "ri-message-2-line",
  //   link: "/apps/chat",
  // },
  // {
  //   id: 8,
  //   label: "menuitems.ecommerce.text",
  //   icon: "ri-shopping-cart-2-line",
  //   badge: {
  //     variant: "danger",
  //     text: "menuitems.ecommerce.badge",
  //   },
  //   isMenuCollapsed: false,
  //   subItems: [
  //     {
  //       id: 9,
  //       label: "menuitems.ecommerce.list.products",
  //       link: "/ecommerce/products",
  //     },
  //     {
  //       id: 10,
  //       label: "menuitems.ecommerce.list.productsgrid",
  //       link: "/ecommerce/products-grid",
  //     },
  //   ],
  // },
  // {
  //   id: 11,
  //   label: "menuitems.email.text",
  //   icon: "ri-mail-line",
  //   isMenuCollapsed: false,
  //   subItems: [
  //     {
  //       id: 12,
  //       label: "menuitems.email.list.inbox",
  //       link: "/email/inbox",
  //     },
  //     {
  //       id: 13,
  //       label: "menuitems.email.list.reademail",
  //       link: "/email/reademail/1",
  //     },
  //     {
  //       id: 14,
  //       label: "menuitems.email.list.template",
  //       link: "/email/templates",
  //     },
  //   ],
  // },
  // {
  //   id: 15,
  //   label: "menuitems.multilevel.text",
  //   icon: "ri-share-line",
  //   isMenuCollapsed: false,
  //   subItems: [
  //     {
  //       id: 16,
  //       label: "menuitems.multilevel.list.level1.1",
  //       link: "javascript: void(0);",
  //     },
  //     {
  //       id: 17,
  //       label: "menuitems.multilevel.list.level1.2",
  //       isMenuCollapsed: false,
  //       subItems: [
  //         {
  //           id: 18,
  //           label: "menuitems.multilevel.list.level1.level2.1",
  //           link: "javascript: void(0);",
  //         },
  //         {
  //           id: 19,
  //           label: "menuitems.multilevel.list.level1.level2.2",
  //           link: "/level2.2",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
