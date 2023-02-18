import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import AuthContext from "@@/context/AuthProvider";
import { useNavigate } from "react-router";
import Logo from "@@/assets/management/logo.png";
import { ProfileModal } from "@@/components";
import "./managementHeader.scss";

const ManagementHeader = ({ url, setUrl }) => {
  const authCtx = useContext(AuthContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privs, setPrivs] = useState(authCtx.privs);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!authCtx.auth || privs === undefined) {
      navigate("/management/login");
    }
  }, []);

  // useEffect(() => {
  //   let temp = [];
  //   axios.get(process.env.REACT_APP_API_URL+"/admin/permission/all").then((res) => {
  //     console.log("res =",res)
  //     res.data.msg.permissions.forEach((p) => {
  //       temp.push(p.identity);
  //     });
  //     setPrivs(temp);
  //   });
  //   console.log("Privs: ", authCtx.privs);

  // }, []);

  return (
    <div className="managementNavWrapper" onClick={() => setUrl(window.location.pathname)}>
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProfileModal click={closeModal} />
      </Popup>

      <Link to="/management/dashboard" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            gap: "1em",
          }}
        >
          <img className="logo" src={Logo} alt="Pelago" />
          <span style={{ color: "white" }}>Management</span>
        </div>
      </Link>
      <div className="navLinks">
        <Link
          to="/management/dashboard"
          className={url.includes("/management/dashboard") ? "underline" : ""}
        >
          Dashboard
        </Link>

        {authCtx.privs?.includes("expense") ? (
          <Link
            to="/management/expense"
            className={url.includes("/management/expense") ? "underline" : ""}
          >
            Expense
          </Link>
        ) : null}

        {authCtx.privs?.includes("sub-account") ? (
          <Link
            to="/management/subaccount"
            className={url.includes("/management/subaccount") ? "underline" : ""}
          >
            Subaccount
          </Link>
        ) : null}

        {authCtx.privs?.includes("currency") ||
        authCtx.privs?.includes("merchant") ||
        authCtx.privs?.includes("liquidity-pool") ? (
          <Link
            to="/management/console"
            className={url.includes("/management/console") ? "underline" : ""}
          >
            Console
          </Link>
        ) : null}

        {authCtx.auth ? (
          <Link
            to="/management/login"
            onClick={() => {
              authCtx.setAuth(false);
              Cookies.set("auth", "false");
              authCtx.setAdmin(false);
              Cookies.set("admin", "false");
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
