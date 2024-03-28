import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";

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
    <div
      className="bg-primary relative 
    items-center flex justify-around
    animate-fade animate-once animate-duration-600 
    animate-ease-in-out animate-normal animate-fill-both"
    >
      <div
        className="max-w-[1186px] w-full sm:max-h-[738px] mx-auto 
      flex items-center align-center justify-around
      flex-col sm:flex-row"
      >
        <form
          id="signup"
          className="min-w-[240px] flex flex-col gap-2 mt-16 sm:mt-0"
          onSubmit={(e) => handleSignUp(e)}
        >
          <p className="text-iconstext-hover font-semibold text-xl">register</p>
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="username"
            type="text"
            value={signupInputs.username}
            onChange={(e) => setSignupInputs({ ...signupInputs, username: e.target.value })}
          />
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="email"
            type="text"
            value={signupInputs.email}
            onChange={(e) => setSignupInputs({ ...signupInputs, email: e.target.value })}
          />
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="confirm email"
            type="text"
            value={signupInputs.confirmEmail}
            onChange={(e) => setSignupInputs({ ...signupInputs, confirmEmail: e.target.value })}
          />
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="password"
            type="password"
            value={signupInputs.password}
            onChange={(e) => setSignupInputs({ ...signupInputs, password: e.target.value })}
          />
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
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
          <button className="px-2 bg-tertiary rounded-md py-1 text-iconstext font-bold">
            Sign up
          </button>
        </form>

        <form
          id="login"
          className="min-w-[240px] flex flex-col gap-2 mt-10 sm:mt-0"
          onSubmit={(e) => handleLoginSubmit(e)}
        >
          <p className="text-iconstext-hover font-semibold text-xl">log in</p>
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="username"
            type="text"
            value={loginInputs.username}
            onChange={(e) => setLoginInputs({ ...loginInputs, username: e.target.value })}
          />
          <input
            className="rounded-md bg-tertiary p-1 placeholder:text-iconstext border-iconstext px-2 text-text"
            placeholder="password"
            type="password"
            value={loginInputs.password}
            onChange={(e) => setLoginInputs({ ...loginInputs, password: e.target.value })}
          />

          <button className="px-2 bg-tertiary rounded-md py-1 text-iconstext font-bold">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
