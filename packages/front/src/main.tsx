import ReactDOM from "react-dom/client";
import "./index.css";
import Providers from "./providers";
import { routes } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers router={routes} />
);
