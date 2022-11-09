import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {Dropdown, ConfirmWithdraw, TipsModal, DefaultButton} from "@@/components";

import "./withdraw.scss";
import ETH from "@@/assets/eth_icon.svg";
import {GetWithdrawList} from "@@/utils/request/api";

const Withdraw = () => {
  const [confirm, setConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();



    return (
    <div className="withdrawPageWrapper">
      {step === 0 && (
        <div className="controls">
          <button className="backButton" onClick={() => navigate("/assets")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
          <div className="banner">Withdraw</div>
        </div>
      )}
      <div className="main">
        {step === 0 && (
          <>
            <div className="title">Select Network and Cryptocurrency</div>
            <div className="tip">
              <span className="title">TIPS:</span>
              <span className="text">
                ETH is the currency for making transaction on Ethereum chain,
                please make sure you have enough ETH to support your transaction
              </span>
            </div>
            <div className="selectors">
              <div className="select">
                <span>Network</span>
                <Dropdown
                  options={["Ethereum"]}
                  defaultTitle="Network"
                  images={[ETH]}
                />
              </div>
              <div className="select">
                <span>Currency</span>
                <Dropdown
                  options={["Ethereum"]}
                  defaultTitle="Currency"
                  images={[ETH]}
                />
              </div>
            </div>

            <div className="buttonRow">
              <DefaultButton
                  title="Next"
                  type={2}
                  click={() => {setStep(1)}}
              />
            </div>
          </>
        ) }

        {step === 1 &&  (
          <ConfirmWithdraw />
          )
        }
      </div>
    </div>
  );
};

export default Withdraw;
