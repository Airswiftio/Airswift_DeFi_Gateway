import React from "react";

import "./historyTable.scss";

const HistoryTable = ({ children, vc = true, select }) => {
  return (
    <div className="historyTableWrapper">
      <div className="columnLabels">
        {select ? <span>Selected</span> : null}
        <span>Trans ID</span>
        <span>Status</span>
        <span>Currency</span>
        <span>Amount</span>
        <span>Time</span>
        <span>View More</span>
        {vc ? <span>VCs</span> : null}
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default HistoryTable;
