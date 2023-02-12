import { describe, expect, it } from "@jest/globals";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { NewTaskForm } from ".";
import {
  fireEvent,
  render,
  screen,
  typeInto,
} from "../../../../utils/test-utils";

describe("home page test", () => {
  it("should create a task and submit correctly", async () => {
    let testedData: any;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      testedData = data;
    };

    render(<NewTaskForm submitter={submitterMock} />);

    const testedDate = new Date().toDateString();
    const [descriptionInput, deadlineInput, form] = await Promise.all([
      screen.findByLabelText("Descrição"),
      screen.findByLabelText("Data de Conclusão"),
      screen.findByRole("form"),
    ]);

    await act(async () => {
      await Promise.all([
        typeInto(descriptionInput, "Test description"),
        typeInto(deadlineInput, testedDate),
      ]);

      await fireEvent.submit(form);
    });
  });
});
