import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Logo from "../../assets/airswift.svg";
import { ProfileModal } from "../";
import "./header.scss";

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const url = window.location.pathname;

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="navWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProfileModal click={closeModal} />
      </Popup>
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
        <div className="navProfile" onClick={() => setIsOpen(true)} />
      </div>
    </div>
  );
};

export default Header;
