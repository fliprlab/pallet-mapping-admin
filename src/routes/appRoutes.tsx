import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/login/Login";
import ProtectedRoute from "../routers/Protected.route";
import Locations from "../pages/locations/Locations";
import GridList from "../pages/grid-list/GridList";
import HubAdmin from "../pages/hub-admin";
import CheckAuthPage from "../pages/checkAuthPage";
import HubProtectedRoute from "../routers/HubProtected.route";
import HubDashboard from "../pages/hub-pages/dashboard/HubDashboard";
import HubUsers from "../pages/hub-pages/users/HubUsers";
import LocationItems from "../pages/hub-pages/location-items/LocationItems";
import Pallets from "../pages/pallets/Pallets";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <CheckAuthPage />,
  },
  {
    path: "admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hub-admin",
        element: <HubAdmin />,
      },
      // {
      //   path: "users",
      //   element: <Users />,
      // },
      {
        path: "locations",
        element: <Locations />,
      },
      {
        path: "grid-list",
        element: <GridList />,
      },
      // {
      //   path: "items",
      //   element: <Items />,
      // },
      {
        path: "pallets",
        element: <Pallets />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hub",
    element: <HubProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <HubDashboard />,
      },
      {
        path: "users",
        element: <HubUsers />,
      },
      {
        path: "items",
        element: <LocationItems />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
