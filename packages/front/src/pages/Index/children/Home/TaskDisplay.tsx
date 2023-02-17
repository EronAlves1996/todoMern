import {
  GraphQLTaggedNode,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { loadTasks } from ".";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

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
    <div>
      <p>{task?.description}</p>
      <p>{task?.deadline}</p>
      <p>{task?.isCompleted.toString()}</p>
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
        <TaskRow task={t} />
      ))}
      ;
    </>
  );
}
