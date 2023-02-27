import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { userOutletContext } from "../../App";
import { FlexComponent, StyledLink } from "../../shared/ui";
import LoginForm from "./LoginForm";

function Index() {
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
          toast(err.message);
        }
      });
  };

  return (
    <>
      <FlexComponent
        flexProps={{ container: true, col: true, grow: false }}
        className="gap-2"
      >
        <LoginForm login={login} />
        <div>
          <a href="">Esqueceu sua senha?</a>
        </div>
        <div>
          <Link to="/registrar">
            <StyledLink>Criar Nova Conta</StyledLink>
          </Link>
        </div>
      </FlexComponent>
    </>
  );
}

export default Index;
