import React from "react";
import { useNavigate } from "react-router-dom";

import Back from "@@/assets/back.svg";
import "./forwardButton.scss";

const ForwardButton = ({ style, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };

  return (
    <div style={style}>
      <span className="forward" onClick={handleClick}>
        Next <img src={Back} alt="Forward" />
      </span>
    </div>
  );
};

export default ForwardButton;
