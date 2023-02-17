import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./styles/expenseHistoryTable.scss";

const ExpenseHistoryTable = ({ children, vc = true, select }) => {
  return (
    <div className="historyTableWrapper">
      <div className="columnLabels">
          <ReactTooltip
              anchorId="app-amount1"
              place="bottom"
              content="service fee 0.25%"
          />
        {select ? <span>Selected</span> : null}
        <span>Trans ID</span>
        <span>Status</span>
        <span>Network</span>
        <span>Currency</span>
        <span>Time</span>
        <span>QR Code</span>
        <span>View More</span>
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default ExpenseHistoryTable;
