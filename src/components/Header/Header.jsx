import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/NewsExplorer-light.svg";
import logoDark from "../../assets/NewsExplorer-dark.svg";
import logoutIcon from "../../assets/log-out-light.svg";
import logoutIconDark from "../../assets/log-out-dark.svg";

function Header({ isLoggedIn, currentUser, onSignInClick, onLogout }) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-articles";

  return (
    <header className={`header ${isSavedPage ? "header_theme_light" : ""}`}>
      <Link to="/" className="logo">
        <img
          src={isSavedPage ? logoDark : logo}
          alt="News Explorer Logo"
          className="header__logo"
        />
      </Link>

      <nav className="nav">
        <Link
          to="/"
          className={`nav__link ${
            location.pathname === "/" ? "nav__link_active" : ""
          } ${isSavedPage ? "nav__link_light" : ""}`}
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/saved-articles"
              className={`nav__link ${
                location.pathname === "/saved-articles"
                  ? "nav__link_active"
                  : ""
              } ${isSavedPage ? "nav__link_light" : ""}`}
            >
              Saved Articles
            </Link>
            <button
              className={`nav__button ${
                isSavedPage ? "nav__button_light" : ""
              }`}
              onClick={onLogout}
            >
              {currentUser?.name}
              <img
                className="header__logout"
                src={isSavedPage ? logoutIconDark : logoutIcon}
                alt="logout icon"
              />
            </button>
          </>
        ) : (
          <button
            className={`nav__button ${
              isSavedPage ? "nav__button_light" : ""
            }`}
            onClick={onSignInClick}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
