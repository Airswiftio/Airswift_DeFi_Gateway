import React from "react";

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
          <span className="label">SStore ID</span>
          <span>AWI1098</span>
        </div>
      </div>

      <div className="bottomSection">
        <span className="title">Base Currency</span>
        {/* Add in currency dropdown */}
      </div>
    </div>
  );
};

export default mystore;
