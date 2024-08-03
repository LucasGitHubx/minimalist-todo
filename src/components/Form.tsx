import "./form.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/connection";
import { Navigate } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [inputType, setInputType] = useState<string>("password");
  const [registerOrLogin, setRegisterOrLogin] = useState<string>("login");

  const [redirect, setRedirect] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /.{6,}/;

    const regexEmailValidation = regexEmail.test(email);
    const regexPasswordValidation = regexPassword.test(password);

    if (!regexEmailValidation) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!regexPasswordValidation) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (regexPasswordValidation && regexEmailValidation) {
      if (registerOrLogin === "login") {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setRedirect(true);
        } catch (error: any) {
          alert(error.code);
        }
      } else if (registerOrLogin === "register") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await signInWithEmailAndPassword(auth, email, password);
          setRedirect(true);
        } catch (error: any) {
          alert(error.code);
        }
      }
    }
  }

  return (
    <>
      <form className="main-form" onSubmit={handleSubmit}>
        <label className={emailError ? "error" : undefined}>
          {emailError ? "Incorrect email format." : "Enter your email"}
        </label>
        <input
          className={emailError ? "error" : undefined}
          type="text"
          placeholder="john@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={passwordError ? "error" : undefined}>
          {passwordError
            ? "Password must be at least 5 chars"
            : "Enter your password"}
        </label>
        <div className="password">
          <input
            className={passwordError ? "error" : undefined}
            id="password-input"
            type={inputType}
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src="../../public/eye-icon.svg"
            alt="eye-icon"
            onMouseDown={() => setInputType("text")}
            onMouseUp={() => setInputType("password")}
          />
        </div>
        <button>{registerOrLogin === "login" ? "Login" : "SignIn"}</button>
      </form>

      {registerOrLogin == "login" ? (
        <div className="register">
          <p>Don't you have an account?</p>
          <a onClick={() => setRegisterOrLogin("register")}>Register</a>
        </div>
      ) : (
        <div className="login">
          <p>Do you have an account?</p>
          <a onClick={() => setRegisterOrLogin("login")}>Login</a>
        </div>
      )}
      {redirect ? <Navigate to="/todo/" /> : undefined}
    </>
  );
}
