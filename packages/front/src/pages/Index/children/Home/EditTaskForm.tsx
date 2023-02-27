import React, { SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import {
  graphql,
  GraphQLTaggedNode,
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from "react-relay";
import { toast } from "react-toastify";
import {
  inputClassName,
  selectClassName,
  StyledButton,
  StyledForm,
} from "../../../../shared/ui";
import DeleteTaskButton from "./DeleteTaskButton";
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
  const refetch = useContext(RefecthContext);
  const formattedDate = getDateFormFormatFrom(data.loadTask?.deadline);

  return (
    <>
      <StyledForm
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
              toast.success("Tarefa editada com sucesso");
              showControllers[1](false);
              refetch!();
            },
            onError: (error) => {
              toast.error(error.message);
            },
          });
        })}
      >
        <p>Data de criação: {data!.loadTask?.creationDate}</p>
        <label>Descrição</label>
        <input
          type="text"
          className={inputClassName}
          {...register("description", { value: data.loadTask?.description })}
        />
        <label>Data de conclusão</label>
        <input
          type="date"
          className={inputClassName}
          {...register("deadline", { value: formattedDate })}
        />
        <label>Concluída?</label>
        <select
          id="isCompleted"
          className={selectClassName}
          {...register("isCompleted", { value: data.loadTask?.isCompleted })}
        >
          <option value="false">Não</option>
          <option value="true">Sim</option>
        </select>
        <StyledButton type="submit">Salvar</StyledButton>
      </StyledForm>
      <DeleteTaskButton id={data.loadTask?._id as string} />
    </>
  );
}

export default EditTaskForm;
