import { PropsWithChildren } from "react";

function FlexContainer({ children }: PropsWithChildren) {
  return <div className="flex">{children}</div>;
}

export default FlexContainer;
