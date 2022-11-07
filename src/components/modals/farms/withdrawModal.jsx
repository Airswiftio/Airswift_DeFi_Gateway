import React, { useEffect, useState } from "react";
import { DefaultButton, ProgressCircle } from "../../";

import "./withdrawModal.scss";

const WithdrawModal = ({ click }) => {
  const [val, setVal] = useState(0);
  const [success, setSuccess] = useState(false);
  const maxVal = 7481;

  useEffect(() => {
    const modal = document.getElementsByClassName("withdrawModalWrapper");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "withdrawModalWrapper") {
        click();
      }
    });
  }, []);

  return (
    <div className="withdrawModalWrapper">
      <div className="modalContent">
        {success ? (
          <div className="modalContent">
            <ProgressCircle percentage={100} />
            <div className="row">
              <DefaultButton title="Transaction Details" type={2} />
            </div>

            <div className="row">
              <DefaultButton title="OK" type={2} />
            </div>
          </div>
        ) : (
          <div className="modalContent">
            <div className="title">Farm</div>
            <div className="row">
              <div className="title">Withdraw Balance</div>
              <div className="title">{maxVal} ETH</div>
            </div>
            <div className="input">
              <input type="text" placeholder="ETH" />
              <div className="btn">
                <DefaultButton
                  title="MAX"
                  type={2}
                  click={() => setVal(maxVal)}
                />
              </div>
            </div>
            <DefaultButton
              title="Approve"
              type={1}
              click={() => setSuccess(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawModal;
