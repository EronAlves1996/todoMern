import { LabeledInputProps, NewPasswordFormProps } from "./types";

export function LabeledInput({
  label,
  type,
  name,
  register,
}: LabeledInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...{ type, ...register(name, { required: true }) }} />
    </>
  );
}

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
      <p>{!equals && <p>Senhas não conferem</p>}</p>
    </>
  );
}
