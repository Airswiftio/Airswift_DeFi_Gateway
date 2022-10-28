import React from "react";

import "./historyTable.scss";

const HistoryTable = ({ children, select, columns }) => {
  return (
    <div className="adminTableWrapper">
      <div className="columnLabels">
        {select ? <span className="select">Selected</span> : null}
        {columns.map((e, index) => (
          <span key={index}>{e}</span>
        ))}
      </div>
      <div className="historyTableContent">{children}</div>
    </div>
  );
};

export default HistoryTable;
