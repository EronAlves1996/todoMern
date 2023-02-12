import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { graphql, useMutation } from "react-relay";
import { useOutletContext } from "react-router-dom";
import { userOutletContext } from "../../../../App";
import { LabeledInput } from "../../../../shared/LabeledInput";

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

export default function Home() {
  const { user } = useOutletContext<userOutletContext>();
  const [commit, isInFlight] = useMutation(newTask);

  const submit: SubmitHandler<FieldValues> = (data) => {
    const { description, deadline } = data;
    const variables = { description, deadline };
    commit({ variables, onCompleted: (r) => console.log(r) });
  };

  //todo: make the NewTaskForm appear only when the button with value "Nova Tarefa" is clicked
  return (
    <>
      <button type="button">Nova Tarefa</button>
      <NewTaskForm submitter={submit} />
    </>
  );
}

export function NewTaskForm({
  submitter,
}: {
  submitter: SubmitHandler<FieldValues>;
}) {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(submitter)}>
        <LabeledInput
          label="Descrição"
          name="description"
          type="text"
          register={register}
        />
        <LabeledInput
          label="Data de Conclusão"
          name="deadline"
          type="date"
          register={register}
        />
        <button type="submit">Salvar tarefa</button>
      </form>
    </>
  );
}
