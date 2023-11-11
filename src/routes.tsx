import { RouteObject, Navigate } from "react-router";
import { Dashboard, Login } from "./pages";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Dashboard,
  },
  { path: '/login', Component: Login },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
