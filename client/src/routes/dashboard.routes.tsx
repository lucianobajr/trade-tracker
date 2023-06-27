import React from "react";

// Admin Imports
import { Default, Profile, Tables } from "../pages/Dashboard/views";

// Icon Imports
import { MdHome, MdBarChart, MdPerson } from "react-icons/md";

const dashboardRoutes = [
  {
    name: "Main Dashboard",
    layout: "/dashboard",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Default />,
    secondary: false,
  },
  {
    name: "Data Tables",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <Tables />,
    secondary: false,
  },
  {
    name: "Profile",
    layout: "/dashboard",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    secondary: false,
  },
];
export default dashboardRoutes;
