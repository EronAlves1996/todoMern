import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { userOutletContext } from "../../App";
import { LabeledInput } from "../../shared/LabeledInput";

function Index() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const location = useLocation();
  const { user, setUser } = useOutletContext<userOutletContext>();
  const navigate = useNavigate();
  if (user !== null) {
    navigate("/home");
  }

  const locationStateMsg = location.state?.msg;

  const login: SubmitHandler<FieldValues> = (data) => {
    const { email, password } = data;
    const encodedLoginData = btoa(email.concat(":", password));
    const authHeader = "Basic " + encodedLoginData;

    fetch("/login", {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: authHeader,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Login incorreto");
      })
      .then((json) => {
        navigate("/home");
        setUser(json);
      })
      .catch((err) => {
        navigate("/", { state: { msg: err.msg } });
      });
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
