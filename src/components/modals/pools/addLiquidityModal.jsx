import React, { useEffect, useState } from "react";
import { DefaultButton, ProgressCircle } from "../../";
import "./addLiquidityModal.scss";

const AddLiquidityModal = ({ click }) => {
  const [val, setVal] = useState(0);
  const [success, setSuccess] = useState(false);
  const maxVal = 7481;

  useEffect(() => {
    const modal = document.getElementsByClassName("addLiquidityModalWrapper");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "addLiquidityModalWrapper") {
        click();
      }
    });
  }, []);

  return (
    <div className="addLiquidityModalWrapper">
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
          <div className="title">Add Liquidity</div>
          <div className="row">
            <div className="title">Your Balance</div>
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
  );
};

export default AddLiquidityModal;
