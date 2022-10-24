import React, { useState } from "react";
import { DefaultButton } from "../";

import "./nameDid.scss";

const NameDid = () => {
  const [name, setName] = useState("Enter DID");

  return (
    <div className="nameDidWrapper">
      <div className="title">
        Give a nickname to <br />
        your Deventralized ID
      </div>
      <input value={name} />
      <DefaultButton title="Confirm" type={1} align={1} />
    </div>
  );
};

export default NameDid;
