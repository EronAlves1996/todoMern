type LabeledInputProps = {
  label: string;
  type: string;
  name: string;
};

export function Registrar() {
  return (
    <form action="">
      <LabeledInput label="Nome" type="text" name="name" />
      <LabeledInput label="E-mail" type="email" name="email" />
      <LabeledInput label="Senha" type="password" name="password" />
      <LabeledInput
        label="Repita sua Senha"
        type="password"
        name="confirmedPassword"
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

function LabeledInput({ label, type, name }: LabeledInputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} />
    </>
  );
}
