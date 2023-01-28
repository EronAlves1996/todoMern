import { useState } from "react";
import { Link } from "react-router-dom";

function Index() {
  const [count, setCount] = useState(0);

  return (
    <>
      <form action="">
        <label htmlFor="">E-mail</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="">Senha</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <a href="">Esqueceu sua senha?</a>
      <Link to="/registrar">Criar nova conta</Link>
    </>
  );
}

export default Index;
