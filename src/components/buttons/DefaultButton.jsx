import React from "react";
import "./defaultButton.scss";

const DefaultButton = ({ title, type, align, click,alternateBg,btnStyle = null }) => {
  const createClass = () => {
    const aligns = ["alignStart", "alignCenter", "alignEnd"];
    switch (type) {
      case 0:
        return `buttonWrapper fixedWidth ${aligns[align]} ${
          alternateBg ? "altBg" : null
        }`;
      case 1:
        return `buttonWrapper ${aligns[align]} ${alternateBg ? "altBg" : null}`;
      case 2:
        return `buttonWrapper fullWidth ${aligns[align]} ${
          alternateBg ? "altBg" : null
        }`;
      default:
        return `buttonWrapper ${aligns[align]} ${alternateBg ? "altBg" : null}`;
    }
  };
  return (
    <div className={createClass()} style={btnStyle} onClick={click}>
      {title}
    </div>
  );
};

export default DefaultButton;
