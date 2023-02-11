import { describe, expect, it } from "@jest/globals";
import { FieldValues, SubmitHandler } from "react-hook-form";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { fireEvent, render, screen } from "../../utils/test-utils";
import { act } from "react-dom/test-utils";

describe("initial page", () => {
  it("should see correctly and test if gonna submit correct data", async () => {
    let testedData: any;

    const login: SubmitHandler<FieldValues> = (data) => {
      testedData = data;
    };

    render(<LoginForm login={login} />);

    const form = await screen.getByRole("form");
    const emailInput = (await screen.findByLabelText(
      "E-mail"
    )) as HTMLInputElement;
    const passwordInput = (await screen.findByLabelText(
      "Senha"
    )) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(emailInput, {
        target: {
          value: "test@test",
        },
      });

      await fireEvent.change(passwordInput, {
        target: {
          value: "1234",
        },
      });
      await fireEvent.submit(form);
    });

    const { email, password } = testedData;
    expect(email).toBe("test@test");
    expect(password).toBe("1234");
  });
});
