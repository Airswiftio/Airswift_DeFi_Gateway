import React from "react";

import { DefaultButton } from "..";
import "./farmCard.scss";

const FarmCard = ({ icon, title }) => {
  return (
    <div className="farmCardWrapper">
      <div className="header">
        <img src={icon} alt={title} />
        <span className="title">{title}</span>
      </div>
      <div className="row">
        <div className="info">APR</div>
        <div className="info">22.199191%</div>
      </div>

      <div className="btn">
        <DefaultButton title="Deposit" type={2} />
        <DefaultButton title="Withdraw" type={2} />
      </div>
      <div className="row">
        <div className="info">TVL</div>
        <div className="info">0.0112</div>
      </div>
      <div className="row">
        <div className="info">Earning</div>
        <div className="info">14/DAY</div>
      </div>
      <div className="row">
        <div className="info">
          Available
          <br />
          Profit Share
        </div>
        <div className="info">14.20214</div>
      </div>
      <div className="btn">
        <DefaultButton title="Harvest" type={2} />
      </div>
    </div>
  );
};

export default FarmCard;
