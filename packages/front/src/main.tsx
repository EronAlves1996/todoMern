import React from "react";
import ReactDOM from "react-dom/client";
import { RelayEnvironmentProvider } from "react-relay";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { RelayEnvironment } from "./RelayEnvironment";
import { routes } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </RelayEnvironmentProvider>
);
