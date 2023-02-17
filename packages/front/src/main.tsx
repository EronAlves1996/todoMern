import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Providers from "./providers";
import { RelayEnvironment } from "./RelayEnvironment";
import { routes } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers environment={RelayEnvironment}>
    <RouterProvider router={routes} />
  </Providers>
);
