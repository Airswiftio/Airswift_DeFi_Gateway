import React from "react";
import { DefaultButton } from "../";

const FailedToConnect = () => {
  return (
    <div className="failedToConnectWrapper">
      <div className="title">Oops!</div>
      <div className="message">Failed to create a DID</div>
      <DefaultButton title="Confirm" type={1} align={1} />
    </div>
  );
};

export default FailedToConnect;
