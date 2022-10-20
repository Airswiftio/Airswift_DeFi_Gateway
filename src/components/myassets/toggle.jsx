import React, { useState } from "react";

import "./toggle.scss";

const Toggle = () => {
  const [state, setState] = useState(0);

  return (
    <div className="toggleWrapper">
      <button
        className={state === 0 ? "active" : ""}
        onClick={() => setState(0)}
      >
        Income
      </button>
      <button
        className={state === 1 ? "active" : ""}
        onClick={() => setState(1)}
      >
        Withdraw
      </button>
    </div>
  );
};

export default Toggle;
