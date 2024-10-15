import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleSignClick,
  handleLoginClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn === true) {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__toggle">
          <ToggleSwitch />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link className="header__link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={currentUser.avatar}
              alt="Avatar Image"
              className="header__avatar"
            />
          </div>
        </Link>
      </header>
    );
  } else {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__toggle">
          <ToggleSwitch />
        </div>
        <button onClick={handleSignClick} className="header__signup">
          Sign Up
        </button>
        <button onClick={handleLoginClick} className="header__login">
          Log In
        </button>
      </header>
    );
  }
}

export default Header;
