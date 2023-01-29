import { UseFormRegister, FieldValues, UseFormWatch } from "react-hook-form";

export type LabeledInputProps = {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<FieldValues>;
};

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
