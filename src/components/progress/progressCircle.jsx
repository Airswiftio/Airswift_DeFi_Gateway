import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./progressCircle.scss";

const ProgressCircle = () => {
  const [percentage, setPercentage] = useState(33);
  return (
    <div className="progressCircle">
      <CircularProgressbar
        text={`${percentage}%`}
        value={percentage}
        styles={buildStyles({
          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.3,

          // Colors
          pathColor: `rgba(95, 255, 169, 1)`,
          textColor: "rgba(95, 255, 169, 1)",
          trailColor: "rgba(0, 255, 255, 0.2)",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default ProgressCircle;
