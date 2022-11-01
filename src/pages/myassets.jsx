import React, { useState } from "react";
import { InfoCard, Toggle, Income, Withdraw, Selectors } from "@@/components";

import "./myassets.scss";

const Assets = () => {
  const [state, setState] = useState(0);
  const [filters, setFilters] = useState([]);

  return (
    <div>
      <div className="assetsContent">
        <Toggle toggle={setState} state={state} />
        <div className="cardRow">
          <InfoCard
            title={state ? "Total Withdraw" : "Total Income"}
            value={2019.8}
            type={1}
          />
          <InfoCard
            title={state ? "Available Balance" : "Todays's Income"}
            value={19.8}
            type={2}
          />
        </div>
        <div className="history">
          <span className="title">
            {state === 0 ? "Income" : "Withdraw"} History
          </span>
          <Selectors setFilters={setFilters} filters={filters} />
          {state === 0 ? <Income /> : <Withdraw />}
        </div>
      </div>
    </div>
  );
};

export default Assets;
