import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../shared/LabeledInput";

function LoginForm({ login }: { login: SubmitHandler<FieldValues> }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(login)} role="form">
      <LabeledInput
        label="E-mail"
        name="email"
        type="email"
        {...{ register }}
      />
      <LabeledInput
        label="Senha"
        name="password"
        type="password"
        {...{ register }}
      />
      <button type="submit" disabled={!isValid}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
