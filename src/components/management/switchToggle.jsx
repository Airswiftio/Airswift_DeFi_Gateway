import React, { useState } from "react";

import "./switchToggle.scss";

const SwitchToggle = ({ isOn, handleToggle, id }) => {
  return (
    <div>
      <input
        checked={isOn}
        onChange={handleToggle}
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
