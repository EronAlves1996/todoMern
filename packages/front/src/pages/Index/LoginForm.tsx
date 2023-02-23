import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../../shared/LabeledInput";

function LoginForm({ login }: { login: SubmitHandler<FieldValues> }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(login)}
      role="form"
      className="flex flex-col gap-4"
    >
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
        <button
          type="submit"
          disabled={!isValid}
          className="bg-green-600 rounded-xl p-2 text-white font-bold text-lg disabled:opacity-50 hover:outline-yellow-300 hover:outline"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
