import { Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  graphql,
  loadQuery,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { RelayEnvironment } from "../../../../RelayEnvironment";
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
      <button type="button">Nova Tarefa</button>
      <NewTaskForm submitter={submit} />

      <Suspense fallback={<p>Carregando...</p>}>
        <TaskDisplay query={taskQuery} />
      </Suspense>
    </>
  );
}

function TaskRow({
  task,
}: {
  task: {
    readonly _id: string | null;
    readonly deadline: any;
    readonly description: string;
    readonly isCompleted: boolean;
  } | null;
}) {
  return (
    <>
      <p>{task?.description}</p>
      <p>{task?.deadline}</p>
      <p>{task?.isCompleted.toString()}</p>
    </>
  );
}

function TaskDisplay({ query }: { query: PreloadedQuery<HomeQuery, {}> }) {
  const data = usePreloadedQuery(loadTasks, query);

  return (
    <>
      {data.loadTasks!.map((t) => (
        <TaskRow task={t} />
      ))}
      ;
    </>
  );
}
