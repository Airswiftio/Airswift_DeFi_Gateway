import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Logo from "../../assets/management/logo.svg";
import { ProfileModal } from "../";
import "./managementHeader.scss";

import ProfilePhoto from "../../assets/sample_profile.svg";

const ManagementHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const url = window.location.pathname;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openMobileModal = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileModal = () => {
    setMobileMenuOpen(false);
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
      <div className="mobileLinks">
        <div className="mobileMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={() => openMobileModal()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="mobileLinksWrapper">
          <div className={mobileMenuOpen ? "mobileMenuLinks" : "hidden"}>
            <Link
              to="/management/dashboard"
              className={
                url.includes("management/dashboard") ? "underline" : ""
              }
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
              className={
                url.includes("management/liquidity") ? "underline" : ""
              }
            >
              Liquidity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementHeader;
