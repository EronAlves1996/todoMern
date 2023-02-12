import { fireEvent, render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";
import Providers from "../providers";

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <Providers>{children}</Providers>;
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
export { customRender as render };
