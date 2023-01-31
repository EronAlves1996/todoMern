import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  return <div>{location.state}</div>;
}
