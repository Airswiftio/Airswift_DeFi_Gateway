import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import AuthContext from "@@/context/AuthProvider";
import Logo from "@@/assets/management/logo.svg";
import { ProfileModal } from "@@/components";
import "./managementHeader.scss";

const ManagementHeader = ({ url, setUrl }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openMobileModal = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setUrl(window.location.pathname);
    console.log(Cookies.get());
  }, []);

  return (
    <div className="managementNavWrapper" onClick={() => setUrl(window.location.pathname)}>
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProfileModal click={closeModal} />
      </Popup>

      <Link to="/management/login">
        <img className="logo" src={Logo} alt="Airswift" />
      </Link>
      <div className="navLinks">
        <Link
          to="/management/dashboard"
          className={url.includes("/management/dashboard") ? "underline" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/management/subaccount"
          className={url.includes("/management/subaccount") ? "underline" : ""}
        >
          Subaccount
        </Link>
        <Link
          to="/management/merchant"
          className={url.includes("/management/merchant") ? "underline" : ""}
        >
          Merchant
        </Link>
        <Link
          to="/management/liquidity"
          className={url.includes("/management/liquidity") ? "underline" : ""}
        >
          Liquidity
        </Link>
        {authCtx.auth ? (
          <Link
            to="/management/login"
            onClick={() => {
              authCtx.setAuth(false);
              Cookies.set("auth", "false");
            }}
          >
            Logout
          </Link>
        ) : null}
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
              className={url.includes("/management/dashboard") ? "underline" : ""}
            >
              Dashboard
            </Link>
            <Link
              to="/management/subaccount"
              className={url.includes("/management/subaccount") ? "underline" : ""}
            >
              Subaccount
            </Link>
            <Link
              to="/management/merchant"
              className={url.includes("/management/merchant") ? "underline" : ""}
            >
              Merchant
            </Link>
            <Link
              to="/management/liquidity"
              className={url.includes("/management/liquidity") ? "underline" : ""}
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
