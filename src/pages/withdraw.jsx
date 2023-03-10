import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmWithdraw, DefaultButton, DropdownNew } from "@@/components";
import BackButton from "@@/components/buttons/BackButton";
import { select_currency } from "@@/utils/config";
import "./withdraw.scss";

const Withdraw = ({ setState }) => {
  const [confirm, setConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate(); 
  const [selectNetwork, setSelectNetwork] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState(0);
  const Options = select_currency("tree");
  console.log(Options);
  const [Options1, setOptions1] = useState(Options?.[0]?._child ?? []);

  const [Currency, setCurrency] = useState(Options?.[0]?._child?.[0]?.key);

  useEffect(() => {
    setOptions1(Options?.[selectNetwork]?._child);
  }, [selectNetwork]);

  const back = () => {
    setStep(0);
  };

  return (
    <div className="withdrawPageWrapper">
      <div className="management">
        <div className="controls">
          {step === 0 ?
            <BackButton style={{ width: "calc(60% + 4em)", textAlign: "left" }} link={{path: "/assets", status: 1}} /> :
            <BackButton style={{ width: "calc(60% + 4em)", textAlign: "left" }} changeState={back} />
          }
        </div>
      <div className="main">
        {step === 0 && (
          <>
            <div className="title" style={{padding: "25px 0"}}>Select Network and Cryptocurrency</div>
            <div className="selectors">
              <div className="select">
                <span>Network</span>
                <DropdownNew
                  buttonStyle={{ width: "180px" }}
                  options={Options}
                  defaultTitle="Network"
                  selected={selectNetwork}
                  setSelected={setSelectNetwork}
                />
              </div>
              <div className="select">
                <span>Currency</span>
                <DropdownNew
                  buttonStyle={{ width: "180px" }}
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
                  setStep(1);
                }}
              />
            </div>
          </>
        )}

        {step === 1 && <ConfirmWithdraw Currency={Currency} setStep={back} setState={setState} />}
      </div>
      </div>
    </div>
  );
};

export default Withdraw;
