import React from "react";
import { Navbar, InfoCard, Toggle } from "../components/";

import "./myassets.scss";

const Assets = () => {
  return (
    <div>
      <Navbar />
      <div className="assetsContent">
        <Toggle />
        <div className="cardRow">
          <InfoCard title="Total Income" value={2019.8} type={1} />
          <InfoCard title="Todays's Income" value={19.8} type={2} />
        </div>
        <div className="incomeHistory">
          <span className="title">Income History</span>
        </div>
      </div>
    </div>
  );
};

export default Assets;
