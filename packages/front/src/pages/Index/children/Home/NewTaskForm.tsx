import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../../../shared/LabeledInput";
import { StyledButton, StyledForm } from "../../../../shared/ui";

export function NewTaskForm({
  submitter,
}: {
  submitter: SubmitHandler<FieldValues>;
}) {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <StyledForm onSubmit={handleSubmit(submitter)}>
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
        <StyledButton type="submit">Salvar tarefa</StyledButton>
      </StyledForm>
    </div>
  );
}
