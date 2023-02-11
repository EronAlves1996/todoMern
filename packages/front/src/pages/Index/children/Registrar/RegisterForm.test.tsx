import { describe, it } from "@jest/globals";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { render } from "../../../../utils/test-utils";
import { RegisterForm } from "./RegisterForm";

describe("register form", () => {
  it("should register and send data", () => {
    let dataSubmitted;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      dataSubmitted = data;
    };

    render(<RegisterForm submitter={submitterMock} />);
  });
});
