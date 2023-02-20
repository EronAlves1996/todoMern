import { createContext, Suspense, useCallback } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { graphql, loadQuery, useMutation, useQueryLoader } from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { RelayEnvironment } from "../../../../RelayEnvironment";
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

const homeQuery = require("./__generated__/HomeQuery.graphql");
export const RefecthContext = createContext<() => void>(() => {});

export default function Home() {
  const { user } = useOutletContext<userOutletContext>();
  const [commit, isInFlight] = useMutation(newTask);
  const [taskQuery, loadTaskQuery] = useQueryLoader<HomeQuery>(
    homeQuery,
    loadQuery<HomeQuery>(RelayEnvironment, loadTasks, { id: user?._id! })
  );
  const refetch = useCallback(() => {
    loadTaskQuery({ id: user?._id! });
  }, []);
  const submit: SubmitHandler<FieldValues> = (data) => {
    const variables = data;
    commit({ variables, onCompleted: (r) => console.log(r) });
  };

  //todo: make the NewTaskForm appear only when the button with value "Nova Tarefa" is clicked
  return (
    <>
      <button type="button">Nova Tarefa</button>
      <NewTaskForm submitter={submit} />

      <Suspense fallback={<p>Carregando...</p>}>
        <RefecthContext.Provider value={refetch}>
          <TaskDisplay query={taskQuery} gqlNode={loadTasks} />
        </RefecthContext.Provider>
      </Suspense>
    </>
  );
}
