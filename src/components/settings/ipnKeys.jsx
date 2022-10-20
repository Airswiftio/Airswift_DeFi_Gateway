import React from "react";
import { DefaultButton } from "../";

import "./ipnKeys.scss";

const ipnKeys = () => {
  return (
    <div className="ipnKeysWrapper">
      <div className="row">
        <span>*****************</span>
        <span className="message">
          Tips：For security reasons we show it only once.
        </span>
      </div>

      <div className="row">
        <span>Last Created Time</span>
        <span className="time">
          24 Mar 2022 <br /> 11:38 am
        </span>
      </div>

      <div className="row">
        <span>Renew</span>
        <span className="button">
          <DefaultButton title="Generate" type={0} align={1} />
        </span>
      </div>
    </div>
  );
};

export default ipnKeys;
