import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
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
      <a href="">Criar nova conta</a>
    </>
  );
}

export default App;
