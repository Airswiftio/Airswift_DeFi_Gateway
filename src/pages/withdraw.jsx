import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {Dropdown, ConfirmWithdraw, TipsModal, DefaultButton, DropdownNew} from "@@/components";

import "./withdraw.scss";
import ETH from "@@/assets/eth_icon.svg";
import {GetWithdrawList} from "@@/utils/request/api";
import {select_currency} from "@@/utils/config";

const Withdraw = ({setState}) => {
  const [confirm, setConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [selectNetwork, setSelectNetwork] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState(0);
  const Options = select_currency('tree');
  const [Options1, setOptions1] = useState(Options?.[0]?._child ??[]);

  const [Currency, setCurrency] = useState(Options?.[0]?._child?.[0]?.key);


  useEffect(() => {
    setOptions1(Options?.[selectNetwork]?._child)
  }, [selectNetwork]);

  const back = () => {
    setStep(0);
};

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
                <DropdownNew
                    buttonStyle={{width:'180px'}}
                    options={Options}
                    defaultTitle="Network"
                    selected={selectNetwork}
                    setSelected={setSelectNetwork}
                />

              </div>
              <div className="select">
                <span>Currency</span>
                <DropdownNew
                    buttonStyle={{width:'180px'}}
                    options={Options1}
                    defaultTitle="Currency"
                    selected={selectCurrency}
                    setSelected={setSelectCurrency}
                />

              </div>
            </div>

            <div className="buttonRow">
              <DefaultButton
                  title="Next"
                  type={2}
                  click={() => {
                    setCurrency(Options?.[selectNetwork]?._child?.[selectCurrency]);
                    setStep(1)
                  }
              }
              />
            </div>
          </>
        ) }

        {step === 1 &&  (
          <ConfirmWithdraw Currency={Currency} setStep={back} setState={setState} />
          )
        }
      </div>
    </div>
  );
};

export default Withdraw;
