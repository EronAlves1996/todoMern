import { useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();

  return <div>{location.state}</div>;
}
