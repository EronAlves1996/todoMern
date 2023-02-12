import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../../../shared/LabeledInput";

export function NewTaskForm({
  submitter,
}: {
  submitter: SubmitHandler<FieldValues>;
}) {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(submitter)} role="form">
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
