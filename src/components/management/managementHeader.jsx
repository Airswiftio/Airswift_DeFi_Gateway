import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Logo from "../../assets/management/logo.svg";
import { ProfileModal } from "../";
import "./managementHeader.scss";

import ProfilePhoto from "../../assets/sample_profile.svg";

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const url = window.location.pathname;

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="managementNavWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProfileModal click={closeModal} />
      </Popup>
      <Link to="/">
        <img className="logo" src={Logo} alt="Airswift" />
      </Link>
      <div className="navLinks">
        <Link
          to="/management/dashboard"
          className={url.length === 1 ? "underline" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/assets"
          className={url.includes("assets") ? "underline" : ""}
        >
          Merchant
        </Link>
        <Link
          to="/liquidity/pools"
          className={url.includes("settings") ? "underline" : ""}
        >
          Liquidity Pool
        </Link>
        <Link
          to="/liquidity/farms"
          className={url.includes("settings") ? "underline" : ""}
        >
          Farms
        </Link>
        {loggedIn ? (
          <div className="profileContainer">
            <div className="imageContainer">
              <img
                src={ProfilePhoto}
                alt="profile"
                className="navProfile"
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="online" />
          </div>
        ) : (
          <Link
            to="/management/login"
            className={url.includes("settings") ? "underline" : ""}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
