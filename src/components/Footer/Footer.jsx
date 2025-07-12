import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github.svg";
 import linkedinIcon from "../../assets/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">&copy; 2025 Supersite, Powered by News API</p>
      <nav className="footer__links">
        <a href="/" className="footer__link">
          Home
        </a>
        <a
          href="https://tripleten.com"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/shay-p77"
          className="footer__icon-link_github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="GitHub" className="footer__icon-github" />
        </a>
        <a
          href="https://linkedin.com/in/shay-paley-867149319"
          className="footer__icon-link_linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="footer__icon-linkedin" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
