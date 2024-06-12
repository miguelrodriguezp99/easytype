/* eslint-disable no-undef */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    // https://${import.meta.env.VITE_API_URL}/auth/login  //production
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_API_URL}/auth/login `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Logged in successfully", {
        className: "max-w-[300px] absolute right-0",
      });
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
