import React, { PropsWithChildren, PropsWithoutRef } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { RouterProvider } from "react-router-dom";
import { RelayEnvironment } from "./RelayEnvironment";

function Providers({ router }: any) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <React.StrictMode>
        <RouterProvider {...{ router }} />
      </React.StrictMode>
    </RelayEnvironmentProvider>
  );
}

export default Providers;
