import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";
import LoginSignup from "./pages/login-signup/LoginSignup";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginSignup />} />
      </Routes>
    </>
  );
}

export default App;
