import { createContext, useCallback, useReducer, useState } from "react";
import {
  graphql,
  GraphQLTaggedNode,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { RelayEnvironment } from "../../../../RelayEnvironment";
import { FlexComponent, StyledButton } from "../../../../shared/ui";
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
    <>
      <FlexComponent
        flexProps={{ container: true }}
        className="items-stretch justify-evenly"
      >
        <p>{task?.description}</p>
        <p>{task?.deadline}</p>
        <p>{task?.isCompleted.toString()}</p>
        <StyledButton
          type="button"
          onClick={() => setShowTaskForm(!showTaskForm)}
          onMouseEnter={() => {
            setQuery(
              loadQuery(
                RelayEnvironment,
                taskDisplayQuery,
                {
                  taskId: task?._id!,
                },
                { fetchPolicy: "network-only" }
              )
            );
          }}
        >
          {showTaskForm ? <span>Cancelar</span> : <span>Editar</span>}
        </StyledButton>
        <EditTaskForm
          query={query!}
          graphqlTag={taskDisplayQuery}
          showControllers={[showTaskForm, setShowTaskForm]}
        />
      </FlexComponent>
    </>
  );
}

export const RefecthContext = createContext<null | (() => void)>(null);

export function TaskDisplay({
  query,
  gqlNode,
}: {
  query: PreloadedQuery<HomeQuery, Record<string, unknown>> | null | undefined;
  gqlNode: GraphQLTaggedNode;
}) {
  const [queryRef, queryReloader] = useQueryLoader<HomeQuery>(gqlNode, query);
  const { user } = useOutletContext<userOutletContext>();
  const refetch = useCallback(() => {
    queryReloader({ id: user?._id as string }, { fetchPolicy: "network-only" });
  }, []);
  return (
    <>
      <FlexComponent flexProps={{ container: true, col: true }}>
        <RefecthContext.Provider value={refetch}>
          <TaskLoader query={queryRef} gqlNode={gqlNode} />
        </RefecthContext.Provider>
      </FlexComponent>
    </>
  );
}

function TaskLoader({
  query,
  gqlNode,
}: {
  query: PreloadedQuery<HomeQuery, Record<string, unknown>> | null | undefined;
  gqlNode: GraphQLTaggedNode;
}) {
  const data = usePreloadedQuery(gqlNode, query!);

  return (
    <>
      {data.loadTasks!.map((t) => (
        <TaskRow task={t} key={t?._id} />
      ))}
    </>
  );
}
