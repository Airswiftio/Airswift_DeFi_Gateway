import React from "react";

import "./switchToggle.scss";

const SwitchToggle = ({ isOn, handleToggle, id, open }) => {
  return (
    <div>
      <input
        checked={isOn}
        onChange={() => {
          if (isOn) {
            open();
          } else {
            handleToggle();
          }
        }}
        className="react-switch-checkbox"
        id={`react-switch-new${id}`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new${id}`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default SwitchToggle;
