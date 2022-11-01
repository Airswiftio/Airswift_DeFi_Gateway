import React from "react";

import { DefaultButton } from "../";
import "./farmCard.scss";

const FarmCard = ({ icon, title }) => {
  return (
    <div className="farmCardWrapper">
      <div className="header">
        <img src={icon} alt={title} />
        <span className="title">{title}</span>
      </div>
      <div className="row">
        <div className="info">Your Position</div>
        <div className="info">122</div>
      </div>
      <div className="row">
        <div className="info">Pool Share</div>
        <div className="info">13441%</div>
      </div>

      <div className="btn">
        <DefaultButton title="Add Liquidity" type={1} />
      </div>
      <div className="row">
        <div className="info">Total Supply</div>
        <div className="info">0.0112</div>
      </div>
      <div className="row">
        <div className="info">APR</div>
        <div className="info">01.221</div>
      </div>

      <div className="btn">
        <DefaultButton title="Remove Liquidity" type={1} />
      </div>
    </div>
  );
};

export default FarmCard;
