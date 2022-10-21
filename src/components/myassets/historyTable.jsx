import React from "react";

import "./historyTable.scss";

const HistoryTable = ({ children, vc = true }) => {
  return (
    <div className="historyTableWrapper">
      <div className="columnLabels">
        <span>Trans ID</span>
        <span>Status</span>
        <span>Currency</span>
        <span>Amount(USD)</span>
        <span>Time</span>
        <span>View More</span>
        {vc ? <span>VCs</span> : null}
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default HistoryTable;
