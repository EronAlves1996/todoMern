import { describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { NewTaskForm } from ".";

describe("home page test", () => {
  it("should create a task and submit correctly", async () => {
    let testedData: any;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      testedData = data;
    };

    render(<NewTaskForm submitter={submitterMock} />);
  });
});
