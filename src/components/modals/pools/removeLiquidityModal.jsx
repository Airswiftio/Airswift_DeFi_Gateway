import React, { useEffect, useState } from "react";
import { DefaultButton, ProgressCircle } from "../../";
import "./removeLiquidityModal.scss";

const RemoveLiquidityModal = ({ click }) => {
  const [val, setVal] = useState(0);
  const [success, setSuccess] = useState(false);

  const maxVal = 7481;

  useEffect(() => {
    const modal = document.getElementsByClassName(
      "removeLiquidityModalWrapper"
    );
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "removeLiquidityModalWrapper") {
        click();
      }
    });
  }, []);

  return (
    <div className="removeLiquidityModalWrapper">
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
            <div className="title">Remove Liquidity</div>
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
    </div>
  );
};

export default RemoveLiquidityModal;
