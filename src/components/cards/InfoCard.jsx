import React from "react";
import Balance from "../../assets/balance.svg";
import Income from "../../assets/income.svg";
import "./infoCard.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const InfoCard = ({ title, value, type,key_index=0 }) => {
  return (
    <div className="infoCardWrapper">
      <img src={type === 0 ? Balance : Income} alt="Balance" />
      <div className="info">
        <span>{title}</span>
        <span id={'app-title'+key_index} className="balance">{value}</span>
      </div>
        <ReactTooltip
            anchorId={'app-title'+key_index}
            place="bottom"
            content={value}
        />
    </div>
  );
};

export default InfoCard;
