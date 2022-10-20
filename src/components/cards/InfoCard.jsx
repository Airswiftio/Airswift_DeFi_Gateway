import React from "react";
import Balance from "../../assets/balance.svg";
import Income from "../../assets/income.svg";
import "./infoCard.scss";

const InfoCard = ({ title, value, type }) => {
  return (
    <div className="infoCardWrapper">
      <img src={type === 0 ? Balance : Income} alt="Balance" />
      <div className="info">
        <span>{title}</span>
        <span className="balance">$ {value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
