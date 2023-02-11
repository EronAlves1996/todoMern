import { LabeledInput } from "../../../../shared/LabeledInput";
import { NewPasswordFormProps } from "./types";

export function NewPasswordForm({
  register,
  watch,
  passwordsAreEquals,
}: NewPasswordFormProps) {
  const password = watch("password");
  const confirmedPassword = watch("confirmedPassword");
  const equals = passwordsAreEquals(password === confirmedPassword);

  return (
    <>
      <LabeledInput
        label="Senha"
        type="password"
        name="password"
        {...{ register }}
      />
      <LabeledInput
        label="Repita sua Senha"
        type="password"
        name="confirmedPassword"
        {...{ register }}
      />
      {!equals && <p>Senhas não conferem</p>}
    </>
  );
}
