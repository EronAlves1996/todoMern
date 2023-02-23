import { LabeledInputProps } from "./Types";
import FlexComponent from "./ui";

export function LabeledInput({
  label,
  type,
  name,
  register,
}: LabeledInputProps) {
  return (
    <>
      <FlexComponent flexProps={{ container: true, col: true }}>
        <label htmlFor={name}>{label}</label>
        <input
          {...{ type, ...register(name, { required: true }) }}
          id={name}
          className="form-input rounded-xl p-2 border-yellow-900 border-opacity-40 focus:border-opacity-80 focus:border-green-500 focus:outline-none"
        />
      </FlexComponent>
    </>
  );
}
