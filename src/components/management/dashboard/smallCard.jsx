import React from "react";

import "./smallCard.scss";

const SmallCard = ({ title, stat, curr = false }) => {
  return (
    <div className="smallCardWrapper">
      <div className="title">{title}</div>
      <div className="stat">
        {curr ? <span className="curr">$</span> : null}
        {stat}
      </div>
    </div>
  );
};

export default SmallCard;
