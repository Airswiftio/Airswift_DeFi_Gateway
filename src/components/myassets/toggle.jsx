import React from "react";

import "./toggle.scss";
import { useNavigate } from "react-router-dom";

const Toggle = ({ setState, state }) => {
    const navigate = useNavigate();

    return (
    <div className="toggleWrapper">
      <button className={state === 0 ? "active" : ""} onClick={() => {
          setState(0);
          navigate("/assets",{
              state: {status:0},
          })

      }}>
        Income
      </button>
      <button className={state === 1 ? "active" : ""} onClick={() => {
          setState(1);
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
