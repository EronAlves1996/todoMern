import { LabeledInputProps } from "./Types";

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
