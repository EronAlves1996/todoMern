import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../shared/LabeledInput";
import { StyledButton, StyledForm } from "../../shared/ui";

function LoginForm({ login }: { login: SubmitHandler<FieldValues> }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <StyledForm onSubmit={handleSubmit(login)}>
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
      <div className="my-5">
        <StyledButton type="submit" disabled={!isValid}>
          Login
        </StyledButton>
      </div>
    </StyledForm>
  );
}

export default LoginForm;
