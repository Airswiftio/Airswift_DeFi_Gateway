import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Logo from "../../assets/management/logo.svg";
import { ProfileModal } from "../";
import "./managementHeader.scss";

import ProfilePhoto from "../../assets/sample_profile.svg";

const ManagementHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const url = window.location.pathname;

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
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
          className={url.includes("management/dashboard") ? "underline" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/management/merchant"
          className={url.includes("management/merchant") ? "underline" : ""}
        >
          Merchant
        </Link>
        <Link
          to="/management/liquidity"
          className={url.includes("management/liquidity") ? "underline" : ""}
        >
          Liquidity
        </Link>

        {loggedIn ? (
          <div className="profileContainer">
            <div className="imageContainer">
              <img
                src={ProfilePhoto}
                alt="profile"
                className="navProfile"
                onClick={() => openModal()}
              />
            </div>
            <div className="online" />
          </div>
        ) : (
          <Link
            to="/management/login"
            className={url.includes("login") ? "underline" : ""}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default ManagementHeader;
