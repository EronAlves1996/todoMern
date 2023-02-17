import { describe, expect, it, jest } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import { TaskDisplay } from ".";
import { RelayEnvironment } from "../../../../RelayEnvironment";
import {
  fireEvent,
  render,
  screen,
  typeInto,
} from "../../../../utils/test-utils";
import { NewTaskForm } from "./NewTaskForm";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

jest.mock("usePreloadedQuery");
const preloadedQueryMock = usePreloadedQuery as jest.Mock<
  typeof usePreloadedQuery
>;

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

  it("should load tasks correctly", () => {
    preloadedQueryMock.mockReturnValue([
      {
        _id: 1,
        deadline: new Date("2022 02 01"),
        description: "Test",
        isCompleted: false,
      },
      {
        _id: 2,
        deadline: new Date("2022 03 05"),
        description: "Test 2",
        isCompleted: false,
      },
      {
        _id: 3,
        deadline: new Date("2022 04 10"),
        description: "Test 3",
        isCompleted: false,
      },
    ]);

    const loadTasks = graphql`
      query HomeQuery($id: String!) {
        loadTasks(userId: $id) {
          _id
          description
          deadline
          isCompleted
        }
      }
    `;
    const taskQuery = loadQuery<HomeQuery>(RelayEnvironment, loadTasks, {
      id: "10",
    });

    render(<TaskDisplay query={taskQuery} />);
  });
});
