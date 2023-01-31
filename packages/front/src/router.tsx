import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import Home from "./pages/Index/children/Home";
import Registrar from "./pages/Index/children/Registrar";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Index />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/home" element={<Home />} />
    </Route>
  )
);
