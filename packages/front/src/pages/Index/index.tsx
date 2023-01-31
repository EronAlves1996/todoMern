import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { graphql, loadQuery } from "react-relay";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RelayEnvironment } from "../../RelayEnvironment";
import { LabeledInput } from "../../shared/LabeledInput";

const loginAs = graphql`
query IndexQuery($email: String!, $password!){
  login(email: $email, password: $password){
    _id
  }
}

`;

function Index() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const locationStateMsg = location.state.msg;

  const login: SubmitHandler<FieldValues> = (data) => {
    const { email, password } = data;
    const query = loadQuery(RelayEnvironment, loginAs, { email, password });
    navigate("/home", { state: { query } });
  };

  return (
    <>
      {locationStateMsg && <p>{locationStateMsg}</p>}
      <form onSubmit={handleSubmit(login)}>
        <LabeledInput
          label="E-mail"
          name="email"
          type="email"
          {...{ register }}
        />
        <LabeledInput
          label="Senha"
          name="password"
          type="password"
          {...{ register }}
        />
        <button type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
      <div>
        <a href="">Esqueceu sua senha?</a>
      </div>
      <div>
        <Link to="/registrar">Criar nova conta</Link>
      </div>
    </>
  );
}

export default Index;
