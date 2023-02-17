import { fireEvent, render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import { createMockEnvironment } from "relay-test-utils";
import Providers from "../providers";

const environment = createMockEnvironment();

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <Providers environment={environment}>{children}</Providers>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export async function typeInto(element: HTMLElement, value: string) {
  await fireEvent.change(element, {
    target: {
      value,
    },
  });
}

export * from "@testing-library/react";
export { customRender as render, environment };
