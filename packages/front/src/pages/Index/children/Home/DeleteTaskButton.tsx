import { useContext } from "react";
import { useMutation } from "react-relay";
import { toast } from "react-toastify";
import { graphql } from "relay-runtime";
import { StyledButton } from "../../../../shared/ui";
import { RefecthContext } from "./TaskDisplay";

const deleteTaskMutation = graphql`
  mutation DeleteTaskButtonMutation($taskId: String!) {
    deleteTask(id: $taskId) {
      _id
    }
  }
`;

function DeleteTaskButton({ id }: { id: string }) {
  const [deleteTask, isOnDeleting] = useMutation(deleteTaskMutation);
  const refetch = useContext(RefecthContext);

  //TODO: confirmation about delete a task
  return (
    <StyledButton
      type="button"
      styleType="danger"
      onClick={() => {
        deleteTask({
          variables: { taskId: id },
          onCompleted: (res, err) => {
            toast.success("Tarefa deletada com sucesso");
            refetch!();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
      }}
    >
      Deletar
    </StyledButton>
  );
}

export default DeleteTaskButton;
