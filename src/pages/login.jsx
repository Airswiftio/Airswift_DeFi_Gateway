import React, { useState } from "react";
import useAuth from "@@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { ProgressModal } from "@@/components";

import "./login.scss";
import AirSwift from "@@/assets/airswift_payment_logo.svg";
import {connectWallet} from "@@/utils/chain/wallet";

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

  const connect = async () => {
    const aa = await connectWallet();
    console.log('aa',aa);
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
          <img src={AirSwift} alt="AirSwift" />
        </div>
        <div className="formTitle">
          <span>Welcome to</span>
          <span className="logoTitle">AirSwift Payment Gateway</span>
        </div>

        <div className="buttons">
          <button onClick={() => connect()} className="connectButton">
            Connect Metamask Wallet
          </button>
          <button className="installMetamask">Install Metamask Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
