import React from "react";

import "./styles/expenseHistoryTable.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
        <span>Trans Hash</span>
        <span>Status</span>
        <span>Chain</span>
        <span>Type</span>
        <span>Amount </span>
        <span>Time</span>
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default ExpenseHistoryTable;
