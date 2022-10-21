import React from "react";

import "./toggle.scss";

const Toggle = ({ toggle, state }) => {
  return (
    <div className="toggleWrapper">
      <button className={state === 0 ? "active" : ""} onClick={() => toggle(0)}>
        Income
      </button>
      <button className={state === 1 ? "active" : ""} onClick={() => toggle(1)}>
        Withdraw
      </button>
    </div>
  );
};

export default Toggle;
