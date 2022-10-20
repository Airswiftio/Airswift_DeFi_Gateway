import React from "react";
import "./defaultButton.scss";

const DefaultButton = ({ title, type, align }) => {
  const createClass = () => {
    const aligns = ["alignStart", "", "alignEnd"];
    let c = `buttonWrapper ${type ? "" : "fixedWidth"} ${aligns[align]}`;

    return c;
  };
  return <div className={createClass()}>{title}</div>;
};

export default DefaultButton;
