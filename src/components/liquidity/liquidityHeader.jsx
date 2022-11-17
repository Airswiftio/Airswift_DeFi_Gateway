import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Logo from "../../assets/management/logo.svg";
import { ProfileModal } from "../";
import "./liquidityHeader.scss";

import ProfilePhoto from "../../assets/sample_profile.svg";

const LiquidityHeader = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [url, setUrl] = useState(window.location.pathname);

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

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  return (
    <div
      className="managementNavWrapper"
      onClick={() => setUrl(window.location.pathname)}
    >
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProfileModal click={closeModal} />
      </Popup>

      <Link to="/management/login">
        <img className="logo" src={Logo} alt="Airswift" />
      </Link>
      <div className="navLinks">
        <Link
          to="/liquidity/pools"
          className={url.includes("/liquidity/pools") ? "underline" : ""}
        >
          Pools
        </Link>
        <Link
          to="/liquidity/farms"
          className={url.includes("/liquidity/farms") ? "underline" : ""}
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
              to="/liquidity/pools"
              className={url.includes("/liquidity/pools") ? "underline" : ""}
            >
              Pools
            </Link>
            <Link
              to="/liquidity/farms"
              className={url.includes("/liquidity/farms") ? "underline" : ""}
            >
              Farms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityHeader;
