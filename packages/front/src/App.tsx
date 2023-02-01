import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      fetch("/verify", {
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Cookie inválido");
        })
        .then((json) => setUser(json))
        .catch((err) => {
          navigate("/", { state: { msg: "Por favor, faça o login" } });
        });
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet context={{ user, setUser }} />
    </Suspense>
  );
}
