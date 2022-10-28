import React from "react";

import "./historyElement.scss";

const HistoryElement = ({ data, checked, click, key, indx }) => {
  return (
    <div className="adminElementWrapper" onClick={click}>
      {checked ? (
        <span className="select">
          {checked.includes(indx) ? (
            <div className="checkBox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          ) : (
            <div
              className={`checkBox ${checked.includes(indx) ? "checked" : ""}`}
            />
          )}
        </span>
      ) : null}
      {data.map((e, index) => (
        <span key={index}>{e}</span>
      ))}
    </div>
  );
};

export default HistoryElement;
