import { FormEventHandler, PropsWithChildren } from "react";

type FlexProperties = {
  container: boolean;
  col?: boolean;
  shrink?: boolean;
  grow?: boolean;
};

function getFlexClassDef(props: FlexProperties) {
  let classDef = "";

  if (props.container) classDef += "flex ";
  if (props.container && props.col) classDef += "flex-col ";
  if (props.shrink != undefined) {
    if (props.shrink) classDef += "flex-shrink ";
    else classDef += "flex-shrink-0 ";
  }
  if (props.grow != undefined) {
    if (props.grow) classDef += "flex-grow ";
    else classDef += "flex-grow-0 ";
  }

  return classDef.trim();
}

export function FlexComponent({
  children,
  flexProps,
  className,
}: PropsWithChildren<{ flexProps: FlexProperties; className?: string }>) {
  return (
    <div
      className={`${getFlexClassDef(flexProps)} ${
        className != undefined ? className : ""
      }`.trim()}
    >
      {children}
    </div>
  );
}

export function StyledLink({ children }: PropsWithChildren) {
  return (
    <span className="text-cyan-600 font-bold hover:text-cyan-500">
      {children}
    </span>
  );
}

export function StyledButton({
  children,
  type,
  disabled,
  onClick,
  onMouseEnter,
}: PropsWithChildren<{
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
}>) {
  return (
    <button
      {...{ type, disabled, onClick, onMouseEnter }}
      className="bg-green-600 rounded-xl p-2 text-white font-bold text-lg disabled:opacity-50 hover:outline-yellow-300 hover:outline"
    >
      {children}
    </button>
  );
}

export function StyledForm({
  children,
  onSubmit,
}: PropsWithChildren<{ onSubmit: FormEventHandler<HTMLFormElement> }>) {
  return (
    <form {...{ onSubmit }} role="form" className="flex flex-col gap-4">
      {children}
    </form>
  );
}
