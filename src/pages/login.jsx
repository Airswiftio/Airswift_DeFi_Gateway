import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { ProgressModal } from "../components";

import "./login.scss";
import Airswift from "../assets/airswift_payment_logo.svg";

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSuccess = () => {
    setAuth({ roles: [3000] });
    navigate(from, { replace: true });
  };

  return (
    <div className="loginWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProgressModal
          click={closeModal}
          setIsOpen={setIsOpen}
          handleSuccess={handleSuccess}
        />
      </Popup>
      <div className="loginForm">
        <div className="formHeader">
          <img src={Airswift} alt="Airswift" />
        </div>
        <div className="formTitle">
          <span>Welcome to</span>
          <span className="logoTitle">Airswift Payment Gateway</span>
        </div>

        <div className="buttons">
          <button onClick={() => setIsOpen(true)} className="connectButton">
            Connect Metamask Wallet
          </button>
          <button className="installMetamask">Install Metamask Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
