import React, { useState } from "react";

import { ProgressCircle, NameDid } from "../components";

import "./connect.scss";

const Connect = () => {
  const [conn, setConn] = useState(true);
  return (
    <div className="connectWrapper">
      {conn ? <NameDid /> : <ProgressCircle />}
    </div>
  );
};

export default Connect;
