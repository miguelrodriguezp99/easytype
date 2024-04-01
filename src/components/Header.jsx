import "./styles/Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Crown,
  Info,
  KeyboardIcon,
  KeyboardSecondIcon,
  Settings,
  Profile,
  Logout,
} from "./../assets/icons/HeaderIcons";
import NotificationModal from "./Modal/NotificationModal";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { useWordsStore } from "../store/useWords";

const Header = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const { restart } = useWordsStore();
  const navigate = useNavigate();

  const handleTitleClick = (e) => {
    e.preventDefault();
    restart();
    navigate("/");
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="keyboard-icon">
        <button onClick={(e) => handleTitleClick(e)}>
          <KeyboardIcon />
        </button>
      </div>
      <span className="header-title" onClick={(e) => handleTitleClick(e)}>
        easytype
      </span>
      <div className="header-icons">
        <div onClick={(e) => handleTitleClick(e)}>
          <KeyboardSecondIcon />
        </div>
        <Crown />

        <Info />
        <Settings />
      </div>

      <div className="profile-icons">
        <div className="header-icons">
          {authUser ? (
            <>
              <div className="group">
                <Link className="profile-icon" to="login">
                  <Profile />
                  <span className="header-username">{authUser.username}</span>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}

          <NotificationModal />

          {authUser ? (
            <div onClick={handleLogOut}>
              <Logout />
            </div>
          ) : (
            <Link to="login">
              <Profile />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
