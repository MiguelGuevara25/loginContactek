import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ListadoTickets from "./pages/ListadoTickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListadoTickets />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
