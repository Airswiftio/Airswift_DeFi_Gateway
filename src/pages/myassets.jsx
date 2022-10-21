import React, { useState } from "react";
import {
  Navbar,
  InfoCard,
  Toggle,
  Income,
  Withdraw,
  Selectors,
} from "../components/";

import "./myassets.scss";

const Assets = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <Navbar />
      <div className="assetsContent">
        <Toggle toggle={setState} state={state} />
        <div className="cardRow">
          <InfoCard title="Total Income" value={2019.8} type={1} />
          <InfoCard title="Todays's Income" value={19.8} type={2} />
        </div>
        <div className="history">
          <span className="title">
            {state === 0 ? "Income" : "Withdraw"} History
          </span>
          <Selectors />
          {state === 0 ? <Income /> : <Withdraw />}
        </div>
      </div>
    </div>
  );
};

export default Assets;
