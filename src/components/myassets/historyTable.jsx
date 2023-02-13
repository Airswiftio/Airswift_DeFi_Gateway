import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./historyTable.scss";

const HistoryTable = ({ children, vc = true, select }) => {
  return (
    <div className="historyTableWrapper">
      <div className="columnLabels">
          <ReactTooltip
              anchorId="app-amount1"
              place="bottom"
              content="service fee 0.3%"
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
