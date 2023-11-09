import { RouteObject, Navigate } from "react-router";
import { Dashboard } from "./pages";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
