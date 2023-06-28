// Admin Imports
import { Default, Profile, Clients, City,Sales,Products,Makers } from "../pages/Dashboard/views";

// Icon Imports
import { MdHome, MdSupervisedUserCircle,MdLocationCity ,MdPerson,MdPointOfSale,MdProductionQuantityLimits,MdLibraryBooks } from "react-icons/md";

const dashboardRoutes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Default />,
    secondary: false,
  },
  {
    name: "Clientes",
    layout: "/dashboard",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    path: "clients",
    component: <Clients />,
    secondary: false,
  },
  {
    name: "Cidades",
    layout: "/dashboard",
    icon: <MdLocationCity className="h-6 w-6" />,
    path: "cities",
    component: <City />,
    secondary: false,
  },
  {
    name: "Vendas",
    layout: "/dashboard",
    path: "sales",
    icon: <MdPointOfSale className="h-6 w-6" />,
    component: <Sales />,
    secondary: false,
  },
  {
    name: "Produtos",
    layout: "/dashboard",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    path: "products",
    component: <Products />,
    secondary: false,
  },
  {
    name: "Fabricantes",
    layout: "/dashboard",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    path: "makers",
    component: <Makers />,
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
