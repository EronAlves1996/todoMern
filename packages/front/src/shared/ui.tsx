import { PropsWithChildren } from "react";

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

function FlexComponent({
  children,
  flexProps,
  className,
}: PropsWithChildren<{ flexProps: FlexProperties; className: string }>) {
  return (
    <div className={getFlexClassDef(flexProps) + " " + className}>
      {children}
    </div>
  );
}

export default FlexComponent;
