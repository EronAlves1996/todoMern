import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { userOutletContext } from "../../App";
import LoginForm from "./LoginForm";

function Index() {
  const location = useLocation();
  const outletContext = useOutletContext<userOutletContext>();
  const navigate = useNavigate();
  if (outletContext.user !== null) {
    navigate("/home");
  }
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
        outletContext.setUser(json);
      })
      .catch((err) => {
        if (err instanceof Error) {
          navigate("/", { state: { msg: err.message } });
        }
      });
  };

  const locationStateMsg = location.state?.msg;

  return (
    <>
      {locationStateMsg && <p>{locationStateMsg}</p>}
      <LoginForm login={login} />
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
