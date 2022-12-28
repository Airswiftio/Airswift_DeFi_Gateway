import React from "react";

import "./toggle.scss";
import { useNavigate } from "react-router-dom";

const Toggle = ({ toggle, state }) => {
    const navigate = useNavigate();

    return (
    <div className="toggleWrapper">
      <button className={state === 0 ? "active" : ""} onClick={() => {
          toggle(0);
          navigate("/assets",{
              state: {status:0},
          })

      }}>
        Income
      </button>
      <button className={state === 1 ? "active" : ""} onClick={() => {
          toggle(1);
          navigate("/assets",{
              state: {status:1},
          })
      }}>
        Withdraw
      </button>
    </div>
  );
};

export default Toggle;
