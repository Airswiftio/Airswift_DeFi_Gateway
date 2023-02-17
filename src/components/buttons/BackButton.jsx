import React from "react";
import { useNavigate } from "react-router-dom";

import Back from "@@/assets/back.svg";
import "./backButton.scss";

const BackButton = ({ setOpen, style }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (setOpen) {
      setOpen(false);
    } else {
      navigate("..");
    }
  };

  return (
    <div style={style}>
      <span className="back" onClick={handleClick}>
        <img src={Back} alt="Back" /> Back
      </span>
    </div>
  );
};

export default BackButton;
