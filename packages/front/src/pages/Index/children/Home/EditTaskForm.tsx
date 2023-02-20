import React, { SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  graphql,
  GraphQLTaggedNode,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from "react-relay";
import { RefecthContext } from "./TaskDisplay";
import { TaskDisplayQuery } from "./__generated__/TaskDisplayQuery.graphql";

const editTaskFormMutation = graphql`
  mutation EditTaskFormMutation($task: TaskInput!, $id: String!) {
    updateTask(id: $id, task: $task) {
      _id
      description
      deadline
      isCompleted
    }
  }
`;

function getDateFormFormatFrom(dateString: string) {
  const date = new Date(Date.parse(dateString));
  const month = date.getMonth() + 1;
  const monthFormatted = month < 10 ? `0${month}` : `${month}`;
  return `${date!.getFullYear()}-${monthFormatted}-${date!.getDate()}`;
}

function EditTaskForm({
  query,
  graphqlTag,
  showControllers,
}: {
  query: PreloadedQuery<TaskDisplayQuery>;
  graphqlTag: GraphQLTaggedNode;
  showControllers: [boolean, React.Dispatch<SetStateAction<boolean>>];
}) {
  if (!showControllers[0]) return null;

  const [commmit, isOnFlight] = useMutation(editTaskFormMutation);
  const { register, handleSubmit } = useForm();
  const data = usePreloadedQuery<TaskDisplayQuery>(graphqlTag, query);
  const formattedDate = getDateFormFormatFrom(data.loadTask?.deadline);
  const refetch = useContext(RefecthContext);

  return (
    <>
      <form
        onSubmit={handleSubmit(({ description, deadline, isCompleted }) => {
          commmit({
            variables: {
              id: data.loadTask?._id,
              task: {
                description,
                deadline,
                isCompleted: isCompleted === "true",
                creationDate: data.loadTask?.creationDate,
              },
            },
            onCompleted: (res, err) => {
              showControllers[1](false);
              refetch!();
            },
          });
        })}
      >
        <p>Data de criação: {data!.loadTask?.creationDate}</p>
        <label>Descrição</label>
        <input
          type="text"
          {...register("description", { value: data.loadTask?.description })}
        />
        <label>Data de conclusão</label>
        <input
          type="date"
          {...register("deadline", { value: formattedDate })}
        />
        <label>Concluída?</label>
        <select
          id="isCompleted"
          {...register("isCompleted", { value: data.loadTask?.isCompleted })}
        >
          <option value="false">Não</option>
          <option value="true">Sim</option>
        </select>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
}

export default EditTaskForm;
