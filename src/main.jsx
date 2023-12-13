import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContactekProvider } from "./context/ContactekProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContactekProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContactekProvider>
  </React.StrictMode>
);
