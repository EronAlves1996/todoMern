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

  return (
    <>
      <button type="button">Nova Tarefa</button>
      <NewTaskForm />
    </>
  );
}

function NewTaskForm() {
  const { register, handleSubmit } = useForm();
  const [commit, isInFlight] = useMutation(newTask);

  const submit: SubmitHandler<FieldValues> = (data) => {
    const { description, deadline } = data;
    const variables = { description, deadline };
    commit({ variables, onCompleted: (r) => console.log(r) });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <LabeledInput
          label="Descrição"
          name="description"
          type="text"
          {...{ register }}
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
