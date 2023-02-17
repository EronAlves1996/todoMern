import { PropsWithChildren, StrictMode } from "react";
import { Environment, RelayEnvironmentProvider } from "react-relay";

function Providers({
  children,
  environment,
}: PropsWithChildren<{ environment: Environment }>) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <StrictMode>{children}</StrictMode>
    </RelayEnvironmentProvider>
  );
}

export default Providers;
