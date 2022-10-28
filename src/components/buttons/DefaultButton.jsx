import React from "react";
import "./defaultButton.scss";

const DefaultButton = ({ title, type, align, click }) => {
  const createClass = () => {
    const aligns = ["alignStart", "alignCenter", "alignEnd"];
    switch (type) {
      case 0:
        return `buttonWrapper fixedWidth ${aligns[align]}`;
      case 1:
        return `buttonWrapper ${aligns[align]}`;
      case 2:
        return `buttonWrapper fullWidth ${aligns[align]}`;
      default:
        return `buttonWrapper ${aligns[align]}`;
    }
  };
  return (
    <div className={createClass()} onClick={click}>
      {title}
    </div>
  );
};

export default DefaultButton;
