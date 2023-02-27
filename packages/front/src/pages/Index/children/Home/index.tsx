import { Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { graphql, loadQuery, useMutation } from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { RelayEnvironment } from "../../../../RelayEnvironment";
import { FlexComponent, StyledButton } from "../../../../shared/ui";
import { NewTaskForm } from "./NewTaskForm";
import { TaskDisplay } from "./TaskDisplay";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

const newTask = graphql`
  mutation HomeMutation($description: String!, $deadline: Date!) {
    createTask(description: $description, deadline: $deadline) {
      _id
      description
      creationDate
      deadline
      isCompleted
    }
  }
`;

export const loadTasks = graphql`
  query HomeQuery($id: String!) {
    loadTasks(userId: $id) {
      _id
      description
      deadline
      isCompleted
    }
  }
`;

export default function Home() {
  const { user } = useOutletContext<userOutletContext>();
  const [commit, isInFlight] = useMutation(newTask);
  const taskQuery = loadQuery<HomeQuery>(RelayEnvironment, loadTasks, {
    id: user?._id!,
  });
  const submit: SubmitHandler<FieldValues> = (data) => {
    const variables = data;
    commit({ variables, onCompleted: (r) => console.log(r) });
  };
  //todo: make the NewTaskForm appear only when the button with value "Nova Tarefa" is clicked
  return (
    <>
      <FlexComponent
        flexProps={{ container: true, col: true, grow: true }}
        className="self-stretch"
      >
        <StyledButton type="button">Nova Tarefa</StyledButton>
        {/*TODO: goes for modal */}
        <NewTaskForm submitter={submit} />

        <Suspense fallback={<p>Carregando...</p>}>
          <TaskDisplay query={taskQuery} gqlNode={loadTasks} />
        </Suspense>
      </FlexComponent>
    </>
  );
}
