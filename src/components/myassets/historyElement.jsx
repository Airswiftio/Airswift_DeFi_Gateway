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
  vc = null,
  click,
}) => {
  return (
    <div className="historyElementWrapper" onClick={click}>
      <span>{transId}</span>
      <span>{status}</span>
      <span>{currency}</span>
      <span>{amount}</span>
      <span>{time}</span>
      <span>
        <img src={Doc} alt="View more" />
      </span>
      {vc !== null ? (
        <span>
          <img src={Verified} alt="Verified" />
        </span>
      ) : null}
    </div>
  );
};

export default HistoryElement;
