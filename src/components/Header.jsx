import "./styles/Header.css";
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

const Header = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const handleTitleClick = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // restart();
    // navigate("/");
    // setFocusedTrue();
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="keyboard-icon">
        <Link to="/">
          <KeyboardIcon />
        </Link>
      </div>
      <span
        className="header-title"
        onClick={(e) => {
          handleTitleClick(e);
        }}
      >
        typemonkey
      </span>
      <div className="header-icons">
        <KeyboardSecondIcon />
        <Link to="/">
          <Crown />
        </Link>
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
