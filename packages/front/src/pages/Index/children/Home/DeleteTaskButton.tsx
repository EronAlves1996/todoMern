import { useContext } from "react";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
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

  return (
    <button
      onClick={() => {
        deleteTask({
          variables: { taskId: id },
          onCompleted: (res, err) => refetch!(),
        });
      }}
    >
      Deletar
    </button>
  );
}

export default DeleteTaskButton;
