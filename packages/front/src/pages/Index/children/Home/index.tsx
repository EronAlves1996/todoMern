import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";

export default function Home() {
  const { user } = useOutletContext<userOutletContext>();

  return (
    <div>
      {user?._id} {user?.email} {user?.name}
    </div>
  );
}
