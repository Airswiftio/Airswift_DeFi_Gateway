import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./login.scss";
import Airswift from "../assets/airswift_payment_logo.svg";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSuccess = () => {
    setAuth({ roles: [3000] });
    navigate(from, { replace: true });
  };

  return (
    <div className="loginWrapper">
      <div className="loginForm">
        <div className="formHeader">
          <img src={Airswift} alt="Airswift" />
        </div>
        <div className="formTitle">
          <span>Welcome to</span>
          <span className="logoTitle">Airswift Payment Gateway</span>
        </div>

        <div className="buttons">
          <button onClick={handleSuccess} className="connectButton">
            Connect Metamask Wallet
          </button>
          <button className="installMetamask">Install Metamask Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
