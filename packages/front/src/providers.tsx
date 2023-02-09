import { PropsWithChildren, StrictMode } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment";

function Providers({ children }: PropsWithChildren) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <StrictMode>{children}</StrictMode>
    </RelayEnvironmentProvider>
  );
}

export default Providers;
