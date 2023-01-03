import React from "react";

import "./historyTable.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const HistoryTable = ({ children, vc = true, select }) => {
  return (
    <div className="historyTableWrapper">
      <div className="columnLabels">
          <ReactTooltip
              anchorId="app-amount1"
              place="bottom"
              content="platform fee 0.25%"
          />
        {select ? <span>Selected</span> : null}
        <span>Trans ID</span>
        <span>Status</span>
        <span>Currency</span>
          {vc ?
              <span id='app-amount1' className="help">Amount <div>?</div></span>
              : <span>Amount </span>
          }

        <span>Time</span>
        <span>View More</span>
        {vc ? <span>VCs</span> : null}
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default HistoryTable;
