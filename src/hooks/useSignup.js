/* eslint-disable no-undef */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    username,
    email,
    confirmEmail,
    password,
    confirmPassword,
  }) => {
    const success = confirmSignup(
      username,
      email,
      confirmEmail,
      password,
      confirmPassword
    );
    if (!success) return;
    setLoading(true);
    // https://${import.meta.env.VITE_API_URL}/auth/signup //production
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            confirmEmail,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Signed up successfully", {
        className: "max-w-[300px] absolute right-0",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

export const confirmSignup = (
  username,
  email,
  confirmEmail,
  password,
  confirmPassword
) => {
  if (!email || !confirmEmail || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (email !== confirmEmail) {
    toast.error("Emails do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
};
