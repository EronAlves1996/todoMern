import { FieldValues, UseFormRegister } from "react-hook-form";

export type LabeledInputProps = {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<FieldValues>;
};
