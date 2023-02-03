import { Suspense, useEffect, useState } from "react";
import {
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const TO_HOME = "/";
const UNLOGGED_MESSAGE = { msg: "Por favor, faça o login" };

type User = {
  _id: string;
  email: string;
  name: string;
};

export type userOutletContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const useVerifyUserLogin = (
  { user, setUser }: userOutletContext,
  navigate: NavigateFunction
) => {
  const location = useLocation();
  useEffect(() => {
    if (user == null)
      verifyAnd(setUser).catch((_) => {
        if (location.pathname != "/")
          navigate(TO_HOME, { state: UNLOGGED_MESSAGE });
      });
  }, []);
};

function verifyAnd(setUser: React.Dispatch<React.SetStateAction<User | null>>) {
  return tryVerifyLogin().then(setUser);
}

function tryVerifyLogin() {
  return fetch("/verify", {
    credentials: "include",
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Cookie inválido");
  });
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useVerifyUserLogin({ user, setUser }, navigate);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet context={{ user, setUser }} />
    </Suspense>
  );
}
