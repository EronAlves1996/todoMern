import { describe, it } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { render, screen } from "../../../../utils/test-utils";
import { RegisterForm } from "./RegisterForm";

describe("register form", () => {
  it("should register and send data", () => {
    let dataSubmitted;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      dataSubmitted = data;
    };

    render(<RegisterForm submitter={submitterMock} />);

    const nameForm = screen.findByLabelText("Nome");
    const emailForm = screen.findByLabelText("E-mail");
    const passwordForm = screen.findByLabelText("Senha");
    const repeatPasswordForm = screen.findByLabelText("Repita sua senha");
    const form = screen.findByRole("form");
  });
});
