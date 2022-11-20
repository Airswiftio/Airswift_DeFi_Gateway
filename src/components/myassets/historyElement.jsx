import React from "react";

import "./historyElement.scss";
import Doc from "../../assets/document.svg";
import Verified from "../../assets/verified.svg";

const HistoryElement = ({
  transId,
  status,
  currency,
  amount,
  time,
  viewMore,
                            vc_status = '',
                            vc_exist = null,
  click,
  checked,
  indx,
}) => {
  return (
    <div className="historyElementWrapper" onClick={click}>
      {checked ? (
        <span>
          {checked.includes(indx) ? (
            <div className="checkBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          ) : (
            <div
              className={`checkBox ${checked.includes(indx) ? "checked" : ""}`}
            />
          )}
        </span>
      ) : null}
      <span>{transId}</span>
      <span>{status}</span>
      <span>{currency}</span>
      <span>{amount}</span>
      <span>{time}</span>
      <span>
        <img src={Doc} alt="View more" />
      </span>
      {vc_exist === false && ['Created','Active'].includes(vc_status) ? (
        <span>
          no
        </span>
      ) :
          <span>
          <img src={Verified} alt="Verified" />
        </span>}
    </div>
  );
};

export default HistoryElement;
