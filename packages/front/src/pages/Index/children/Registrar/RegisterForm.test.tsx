import { describe, expect, it } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { fireEvent, render, screen } from "../../../../utils/test-utils";
import { RegisterForm } from "./RegisterForm";

describe("register form", () => {
  it("should register and send data", async () => {
    let dataSubmitted: any;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      dataSubmitted = data;
    };

    render(<RegisterForm submitter={submitterMock} />);

    const nameForm = await screen.findByLabelText("Nome");
    const emailForm = await screen.findByLabelText("E-mail");
    const passwordForm = await screen.findByLabelText("Senha");
    const repeatPasswordForm = await screen.findByLabelText("Repita sua Senha");
    const form = await screen.findByRole("form");

    await act(async () => {
      await typeIn(nameForm, "Test user");
      await typeIn(emailForm, "test@test");
      await typeIn(passwordForm, "1234");
      await typeIn(repeatPasswordForm, "1234");
      await fireEvent.submit(form);
    });

    const { name, email, password, confirmedPassword } = dataSubmitted;
    expect(name).toBe("Test user");
    expect(email).toBe("test@test");
    expect(password).toBe("1234");
    expect(confirmedPassword).toBe("1234");
  });
});

async function typeIn(element: HTMLElement, value: string) {
  await fireEvent.change(element, {
    target: {
      value,
    },
  });
}
