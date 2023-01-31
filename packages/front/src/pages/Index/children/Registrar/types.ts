import { UseFormRegister, FieldValues, UseFormWatch } from "react-hook-form";

export type RegistrarFormValues = {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export type NewPasswordFormProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  passwordsAreEquals: (equals: boolean) => boolean;
};
