import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

type User = {
  _id: string;
  email: string;
  name: string;
};

export type userOutletContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet context={{ user, setUser }} />
    </Suspense>
  );
}
