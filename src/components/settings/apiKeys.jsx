import React from "react";

import Copy from "../../assets/copy.svg";
import Refresh from "../../assets/refresh.svg";

import "./apiKeys.scss";

const apiKeys = () => {
  return (
    <div className="apiKeysWrapper">
      <div className="row">
        <span>EY6JZ44-9BKMNYN-GC7QMDP-N28K2KM</span>
        <div className="img">
          <img src={Copy} alt="copy" />
        </div>
      </div>

      <div className="row">
        <span>Created Time</span>
        <span className="time">
          24 Mar 2022 <br /> 11:38 am
        </span>
      </div>

      <div className="row">
        <span>Renew</span>
        <div className="img">
          <img src={Refresh} alt="refresh" />
        </div>
      </div>
    </div>
  );
};

export default apiKeys;
