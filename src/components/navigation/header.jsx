import React from "react";
import Logo from "../../assets/airswift.svg";
import "./header.scss";

const Header = () => {
  return (
    <div className="navWrapper">
      <img className="logo" src={Logo} alt="Airswift" />
      <div className="navLinks">
        <span>DASHBOARD</span>
        <span>MY ASSETS</span>
        <span>SETTINGS</span>
      </div>
      <div className="navProfile"></div>
    </div>
  );
};

export default Header;
