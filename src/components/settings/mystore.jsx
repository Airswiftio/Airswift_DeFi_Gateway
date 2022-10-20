import React from "react";

import { Dropdown } from "../";

import "./mystore.scss";

const mystore = () => {
  return (
    <div className="myStore">
      <div className="main">
        <div className="row">
          <span className="label">Store Name</span>
          <span>Omnisolu</span>
        </div>

        <div className="row">
          <span className="label">Role</span>
          <span>Contributor</span>
        </div>

        <div className="row">
          <span className="label">Store ID</span>
          <span>AWI1098</span>
        </div>
      </div>

      <div className="bottomSection">
        <span className="bottomSectionTitle">Base Currency</span>
        <Dropdown options={["USD", "CAD"]} />
      </div>
    </div>
  );
};

export default mystore;
