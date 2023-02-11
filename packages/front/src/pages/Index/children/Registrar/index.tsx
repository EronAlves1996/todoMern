import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { graphql, useMutation, UseMutationConfig } from "react-relay";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Disposable, MutationParameters, PayloadError } from "relay-runtime";
import { LabeledInput } from "../../../../shared/LabeledInput";
import { NewPasswordForm } from "./components";
import { RegisterForm } from "./RegisterForm";

const registrar = graphql`
  mutation RegistrarMutation($user: UserInput) {
    createUser(user: $user) {
      _id
    }
  }
`;

const useIndexFormHandleSubmition = (
  commit: (config: UseMutationConfig<MutationParameters>) => Disposable,
  navigate: NavigateFunction
) => {
  return (data: FieldValues) => {
    const { name, email, password } = data;
    const variables = { user: { name, email, password } };

    const forwardHandleOnCompleted = (
      response: {},
      errors: PayloadError[] | null
    ) => {
      console.log(response);
      navigate("/", { state: { msg: "Usuário registrado com sucesso" } });
    };

    commit({
      variables,
      onCompleted: forwardHandleOnCompleted,
    });
  };
};

export default function Registrar() {
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation(registrar);
  const submitter = useIndexFormHandleSubmition(commit, navigate);

  const submit: SubmitHandler<FieldValues> = (data) => {
    submitter(data);
  };

  return <RegisterForm submitter={submit} />;
}
