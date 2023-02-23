import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
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
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <div className="flex-grow flex flex-col">
        <OutletAsyncWrapper>
          <Outlet context={{ user, setUser }} />
        </OutletAsyncWrapper>
        <FooterBar />
      </div>
    </div>
  );
}

function HeaderBar() {
  return <div className="bg-green-600 h-10 flex-grow-0"></div>;
}

function FooterBar() {
  return <div className="bg-green-600 h-36 flex-shrink-0"></div>;
}

function OutletAsyncWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex-grow flex-shrink-0">
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => {
          resetErrorBoundary();
          return <></>;
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
}
