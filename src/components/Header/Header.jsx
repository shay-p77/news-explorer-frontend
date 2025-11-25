import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/NewsExplorer-light.svg";
import logoDark from "../../assets/NewsExplorer-dark.svg";
import logoutIcon from "../../assets/log-out-light.svg";
import logoutIconDark from "../../assets/log-out-dark.svg";

function Header({ isLoggedIn, currentUser, onSignInClick, onLogout }) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-articles";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`header ${isSavedPage ? "header_theme_light" : ""}`}>
      <Link to="/" className="logo">
        <img
          src={isSavedPage ? logoDark : logo}
          alt="News Explorer Logo"
          className="header__logo"
        />
      </Link>

      {/* Hamburger icon */}
      <button
        className={`header__menu-icon ${
          isMobileMenuOpen ? "header__menu-icon_open" : ""
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
      </button>

      {/* Navigation */}
      <nav
        className={`nav ${isMobileMenuOpen ? "nav_open" : ""} ${
          isLoggedIn ? "nav_logged-in" : ""
        }`}
      >
        <Link
          to="/"
          className={`nav__link ${
            location.pathname === "/" ? "nav__link_active" : ""
          } ${isSavedPage ? "nav__link_light" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Saved Articles
            </Link>
            <button
              className={`nav__button ${
                isSavedPage ? "nav__button_light" : ""
              }`}
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
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
            className={`nav__button ${isSavedPage ? "nav__button_light" : ""}`}
            onClick={() => {
              onSignInClick();
              setIsMobileMenuOpen(false);
            }}
          >
            Sign In
          </button>
        )}
      </nav>
      {isMobileMenuOpen && (
        <div
          className="header__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
