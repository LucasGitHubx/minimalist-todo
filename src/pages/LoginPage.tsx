import { NavLink } from "react-router-dom";
import Form from "../components/Form";

export default function LoginPage() {
  return (
    <>
      <header>
        <h1>Minimalist todolist</h1>
        <NavLink to="/todo/login">Login</NavLink>
      </header>

      <div className="login-page page">
        <Form />
      </div>
    </>
  );
}
