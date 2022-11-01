import React from "react";
import { DefaultButton } from "@@/components";
import { useNavigate } from "react-router-dom";
import "./setup.scss";

const Setup = () => {
  const navigate = useNavigate();

  return (
    <div className="setupWrapper">
      <div className="setup">
        <button
          className="backButton"
          onClick={() => navigate("/stores/choose")}
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
        <div className="main">
          <div className="title">Setup Your Store</div>

          <div className="row">
            <div className="label">Store name</div>
            <input type="text" placeholder="" />
          </div>

          <div className="row">
            <div className="label">Store link</div>
            <input type="text" placeholder="" />
          </div>

          <div className="row">
            <div className="label">Callback url</div>
            <input type="text" placeholder="" />
          </div>
        </div>

        <div className="buttonRow">
          <DefaultButton
            title="Next"
            type={2}
            click={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </div>
  );
};

export default Setup;
