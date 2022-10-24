import React from "react";

import { Dropdown, Search, Datepicker } from "../";

import "./selectors.scss";

const Selectors = () => {
  return (
    <div className="selectorsWrapper">
      <Dropdown
        options={["Finished", "Pending"]}
        defaultTitle="Status"
        isFilter
      />
      <Dropdown
        options={["USDC", "USDT", "BTN", "ETH"]}
        defaultTitle="Currency"
        isFilter
      />
      <Datepicker />
      <Search />
    </div>
  );
};

export default Selectors;
