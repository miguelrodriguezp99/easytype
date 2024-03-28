import "./styles/Header.css";
import { Link } from "react-router-dom";
import {
  Crown,
  Info,
  KeyboardIcon,
  KeyboardSecondIcon,
  Settings,
  Profile,
} from "./../assets/icons/HeaderIcons";
import NotificationModal from "./Modal/NotificationModal";
const Header = () => {
  const handleTitleClick = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // restart();
    // navigate("/");
    // setFocusedTrue();
  };

  return (
    <header className="header">
      <div className="keyboard-icon">
        <Link to="/">
          <KeyboardIcon />
        </Link>
      </div>
      <h1
        className="header-title"
        onClick={(e) => {
          handleTitleClick(e);
        }}
      >
        typemonkey
      </h1>
      <div className="header-icons">
        <KeyboardSecondIcon />
        <Link to="/">
          <Crown />
        </Link>
        <Info />
        <Settings />
      </div>

      <div className="profile-icons">
        <NotificationModal />

        <Link to="login">
          <Profile />
        </Link>
      </div>
    </header>
  );
};

export default Header;
