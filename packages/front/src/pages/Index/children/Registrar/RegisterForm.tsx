import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../../../shared/LabeledInput";
import { NewPasswordForm } from "./components";

export function RegisterForm({
  submitter,
}: {
  submitter: SubmitHandler<FieldValues>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm();
  const [passwordsAreEquals, setPasswordsAsEquals] = useState(false);
  const checkPasswordsAsEquals = (equals: boolean) => {
    setPasswordsAsEquals(equals);
    return equals;
  };
  return (
    <form onSubmit={handleSubmit(submitter)}>
      <LabeledInput label="Nome" type="text" name="name" {...{ register }} />
      <LabeledInput
        label="E-mail"
        type="email"
        name="email"
        {...{ register }}
      />
      <NewPasswordForm
        {...{ register, watch, passwordsAreEquals: checkPasswordsAsEquals }}
      />
      <button type="submit" disabled={!isValid || !passwordsAreEquals}>
        Cadastrar
      </button>
    </form>
  );
}
