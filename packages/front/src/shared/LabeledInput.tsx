import { LabeledInputProps } from "./Types";
import { FlexComponent, inputClassName } from "./ui";

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
          className={inputClassName}
        />
      </FlexComponent>
    </>
  );
}
