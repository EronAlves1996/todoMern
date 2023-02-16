import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { NewTaskForm } from "./NewTaskForm";
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

export default function Home() {
  const { user } = useOutletContext<userOutletContext>();
  const [commit, isInFlight] = useMutation(newTask);
  const tasks = useLazyLoadQuery<HomeQuery>(loadTasks, {
    id: user?._id!,
  });
  const submit: SubmitHandler<FieldValues> = (data) => {
    const variables = data;
    commit({ variables, onCompleted: (r) => console.log(r) });
  };

  //todo: make the NewTaskForm appear only when the button with value "Nova Tarefa" is clicked
  return (
    <>
      <button type="button">Nova Tarefa</button>
      <NewTaskForm submitter={submit} />
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => {
          return (
            <div>
              <p style={{ color: "red", fontWeight: "bold" }}>
                Ocorreu um erro ao carregar suas tarefas!!
              </p>
              <button onClick={resetErrorBoundary}>Tentar novamente</button>
            </div>
          );
        }}
      >
        <Suspense fallback={<p>Carregando...</p>}>
          <div>
            {tasks.loadTasks?.map((t) => (
              <div key={t?._id}>
                <p>{t?.description}</p>
                <p>{t?.deadline}</p>
                <p>{t?.isCompleted.toString()}</p>
              </div>
            ))}
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
