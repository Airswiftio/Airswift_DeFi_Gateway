import React, { useState } from "react";
import { post as httpPost } from "@@/utils/request/http";
import "./sippageTolerance.scss";

const SippageTolerance = () => {
  const [slippageTolerance, setSlippageTolerance] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
     setSlippageTolerance(value === "" ? "" : parseInt(value));
  };

  const handleSubmit = async () => {
    const res = await httpPost("merchant/application/slippage", {
      app_id: 0,
      slippage: slippageTolerance,
    });
    console.log(res);
  };

  return (
    <div className="sippageToleranceWrapper">
      <div className="slippage" onClick={handleSubmit}>
        Save
      </div>
      <div className="inputWrapper">
        <input
          placeholder="Slippage tolerance"
          value={slippageTolerance}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SippageTolerance;
