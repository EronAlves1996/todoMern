import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { graphql, useMutation } from "react-relay";
import { useNavigate } from "react-router-dom";
import { LabeledInput, NewPasswordForm } from "./components";

const registrarMutation = graphql`
  mutation RegistrarMutation($user: UserInput) {
    createUser(user: $user) {
      _id
    }
  }
`;

export default function Registrar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm();
  const navigate = useNavigate();
  const [passwordsAreEquals, setPasswordsAsEquals] = useState(false);
  const [commit, isInFlight] = useMutation(registrarMutation);

  const enableButton = () => {
    return !isValid || !passwordsAreEquals;
  };

  const checkPasswordsAsEquals = (equals: boolean) => {
    setPasswordsAsEquals(equals);
    return equals;
  };

  const submit: SubmitHandler<FieldValues> = (data) => {
    const { name, email, password } = data;
    const user = { name, email, password };

    commit({
      variables: {
        user,
      },
      onCompleted(response, errors) {
        console.log(response);
        navigate("/", { state: { msg: "Usuário registrado com sucesso" } });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
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
      <button type="submit" disabled={enableButton()}>
        Cadastrar
      </button>
    </form>
  );
}
