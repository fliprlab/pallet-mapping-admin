import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/login/Login";
import ProtectedRoute from "../routers/Protected.route";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
