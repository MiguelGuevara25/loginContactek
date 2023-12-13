import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ContactekProvider } from "./context/ContactekProvider.jsx";
import router from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContactekProvider>
      <RouterProvider router={router} />
    </ContactekProvider>
  </React.StrictMode>
);
