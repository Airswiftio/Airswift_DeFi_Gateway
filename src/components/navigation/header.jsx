import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/airswift.svg";
import "./header.scss";

const Header = () => {
  const url = window.location.pathname;

  return (
    <div className="navWrapper">
      <Link to="/">
        <img className="logo" src={Logo} alt="Airswift" />
      </Link>
      <div className="navLinks">
        <Link to="/" className={url.length === 1 ? "underline" : ""}>
          DASHBOARD
        </Link>
        <Link
          to="/assets"
          className={url.includes("assets") ? "underline" : ""}
        >
          MY ASSETS
        </Link>
        <Link
          to="/settings"
          className={url.includes("settings") ? "underline" : ""}
        >
          SETTINGS
        </Link>
      </div>
      <div className="profileContainer">
        <div className="navProfile" />
      </div>
    </div>
  );
};

export default Header;
