import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./confirmWithdrawModal.scss";

import USDC from "../../assets/usdc_icon.svg";

const ConfirmWithdrawModal = ({ click, total = 444, currency = "USDC" }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("withdrawModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "withdrawModal") {
        click();
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="withdrawModal">
      <div className="modalContent">
        <div className="title">Withdraw Confirmation</div>
        <div className="withdrawTotal">
          <div className="total">{`$ ${total}`}</div>
          <div className="currency">
            <img src={USDC} alt="currency" />
            {` ${currency}`}
          </div>
        </div>
        <div className="gas">
          <span>Gas Tips:</span>
          <span>Gas fee**** ETH</span>
        </div>
        <DefaultButton
          title="Confirm Withdraw"
          click={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};

export default ConfirmWithdrawModal;
