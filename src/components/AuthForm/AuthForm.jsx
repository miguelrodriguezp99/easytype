import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";
import "../styles/AuthForm.css";

const AuthForm = () => {
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });

  const [signupInputs, setSignupInputs] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useLogin();
  const { signup } = useSignup();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(loginInputs);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(signupInputs);
  };

  return (
    <div className="auth-form-container ">
      <form
        id="signup"
        className="sign-up-form"
        onSubmit={(e) => handleSignUp(e)}
      >
        <p className="auth-title">register</p>
        <input
          className="auth-form-input"
          placeholder="username"
          type="text"
          value={signupInputs.username}
          onChange={(e) =>
            setSignupInputs({ ...signupInputs, username: e.target.value })
          }
        />
        <input
          className="auth-form-input"
          placeholder="email"
          type="text"
          value={signupInputs.email}
          onChange={(e) =>
            setSignupInputs({ ...signupInputs, email: e.target.value })
          }
        />
        <input
          className="auth-form-input"
          placeholder="confirm email"
          type="text"
          value={signupInputs.confirmEmail}
          onChange={(e) =>
            setSignupInputs({ ...signupInputs, confirmEmail: e.target.value })
          }
        />
        <input
          className="auth-form-input"
          placeholder="password"
          type="password"
          value={signupInputs.password}
          onChange={(e) =>
            setSignupInputs({ ...signupInputs, password: e.target.value })
          }
        />
        <input
          className="auth-form-input"
          placeholder="confirm password"
          type="password"
          value={signupInputs.confirmPassword}
          onChange={(e) =>
            setSignupInputs({
              ...signupInputs,
              confirmPassword: e.target.value,
            })
          }
        />
        <button className="auth-button">Sign up</button>
      </form>

      <form
        id="login"
        className="login-form"
        onSubmit={(e) => handleLoginSubmit(e)}
      >
        <p className="auth-title">log in</p>
        <input
          className="auth-form-input"
          placeholder="username"
          type="text"
          value={loginInputs.username}
          onChange={(e) =>
            setLoginInputs({ ...loginInputs, username: e.target.value })
          }
        />
        <input
          className="auth-form-input"
          placeholder="password"
          type="password"
          value={loginInputs.password}
          onChange={(e) =>
            setLoginInputs({ ...loginInputs, password: e.target.value })
          }
        />

        <button className="auth-button">Log In</button>
      </form>
    </div>
  );
};

export default AuthForm;
