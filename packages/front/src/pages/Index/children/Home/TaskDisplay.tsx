import { useState } from "react";
import {
  graphql,
  GraphQLTaggedNode,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { RelayEnvironment } from "../../../../RelayEnvironment";
import EditTaskForm from "./EditTaskForm";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";
import { TaskDisplayQuery } from "./__generated__/TaskDisplayQuery.graphql";

const taskDisplayQuery = graphql`
  query TaskDisplayQuery($taskId: String!) {
    loadTask(id: $taskId) {
      _id
      description
      deadline
      isCompleted
      creationDate
    }
  }
`;

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
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [query, setQuery] = useState<PreloadedQuery<TaskDisplayQuery> | null>(
    null
  );

  return (
    <div>
      <p>{task?.description}</p>
      <p>{task?.deadline}</p>
      <p>{task?.isCompleted.toString()}</p>
      <button
        onClick={() => setShowTaskForm(!showTaskForm)}
        onMouseEnter={() => {
          setQuery(
            loadQuery(RelayEnvironment, taskDisplayQuery, {
              taskId: task?._id!,
            })
          );
        }}
      >
        {showTaskForm ? <span>Cancelar</span> : <span>Editar</span>}
      </button>
      <EditTaskForm
        query={query!}
        graphqlTag={taskDisplayQuery}
        showControllers={[showTaskForm, setShowTaskForm]}
      />
    </div>
  );
}

export function TaskDisplay({
  query,
  gqlNode,
}: {
  query: PreloadedQuery<HomeQuery, {}>;
  gqlNode: GraphQLTaggedNode;
}) {
  const data = usePreloadedQuery(gqlNode, query);
  return (
    <>
      {data.loadTasks!.map((t) => (
        <TaskRow task={t} key={t?._id} />
      ))}
      ;
    </>
  );
}
