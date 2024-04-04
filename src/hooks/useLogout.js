/* eslint-disable no-undef */
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    // https://${import.meta.env.VITE_API_URL}/auth/logout
    try {
      const res = await fetch(
        `https://${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("authUser");
      setAuthUser(null);
      toast.success("Logged out successfully", {
        className: "max-w-[300px] absolute right-0",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
