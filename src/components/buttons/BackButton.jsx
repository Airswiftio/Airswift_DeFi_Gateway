import React from "react";
import { useNavigate } from "react-router-dom";

import Back from "@@/assets/back.svg";
import "./backButton.scss";

const BackButton = ({ setOpen, style, link, changeState  }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (setOpen) {
      setOpen(false);
    } else if (link){
      navigate(link.path, {state: {status: link.status}} );
    } else {
      navigate("..");
    }
  };

  return (
    <div style={style}>
      <span className="back" onClick={changeState ? changeState : handleClick}>
        <img src={Back} alt="Back" /> Back
      </span>
    </div>
  );
};

export default BackButton;
