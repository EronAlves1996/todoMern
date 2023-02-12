import { describe, expect, it } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  fireEvent,
  render,
  screen,
  typeInto,
} from "../../../../utils/test-utils";
import { NewTaskForm } from "./NewTaskForm";

describe("home page test", () => {
  it("should create a task and submit correctly", async () => {
    let testedData: any;

    const submitterMock: SubmitHandler<FieldValues> = (data) => {
      testedData = data;
    };

    render(<NewTaskForm submitter={submitterMock} />);

    const [descriptionInput, deadlineInput, form] = await Promise.all([
      screen.findByLabelText("Descrição"),
      screen.findByLabelText("Data de Conclusão"),
      screen.findByRole("form"),
    ]);

    await act(async () => {
      await Promise.all([
        typeInto(descriptionInput, "Test description"),
        typeInto(deadlineInput, "2022-10-01"),
      ]);

      await fireEvent.submit(form);
    });

    const { description, deadline } = testedData;
    expect(description).toBe("Test description");
    expect(deadline).toBe("2022-10-01");
  });
});
