import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import FlexComponent from "./shared/ui";

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
    <>
      <FlexComponent
        flexProps={{ container: true, col: true, otherDefs: "min-h-screen" }}
      >
        <HeaderBar />
        <FlexComponent flexProps={{ container: true, grow: true, col: true }}>
          <OutletAsyncWrapper>
            <Outlet context={{ user, setUser }} />
          </OutletAsyncWrapper>
          <FooterBar />
        </FlexComponent>
      </FlexComponent>
    </>
  );
}

function HeaderBar() {
  return (
    <>
      <FlexComponent
        flexProps={{ container: false, otherDefs: "h-10 bg-green-600" }}
      />
    </>
  );
}

function FooterBar() {
  return (
    <>
      <FlexComponent
        flexProps={{
          container: false,
          otherDefs: "h-36 bg-green-600",
          grow: false,
          shrink: false,
        }}
      />{" "}
    </>
  );
}

function OutletAsyncWrapper({ children }: PropsWithChildren) {
  return (
    <FlexComponent flexProps={{ container: false, grow: true, shrink: false }}>
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => {
          resetErrorBoundary();
          return <></>;
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </ErrorBoundary>
    </FlexComponent>
  );
}
