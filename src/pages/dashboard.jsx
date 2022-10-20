import React, { useState } from "react";
import { Navbar, InfoCard, DefaultButton } from "../components/";

import "./dashboard.scss";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="dashboardContent">
        <div className="cardRow">
          <InfoCard title="Total Balance" value={9898} type={0} />
          <InfoCard title="Total Balance" value={4556} type={0} />
        </div>
        <div className="balanceOverview">
          <span className="title">Balance Overview</span>
          <div className="buttonSelectors">
            <button
              onClick={() => setTimeframe(0)}
              className={timeframe === 0 ? "selected" : ""}
            >
              24H
            </button>
            <button
              onClick={() => setTimeframe(1)}
              className={timeframe === 1 ? "selected" : ""}
            >
              7D
            </button>
            <button
              onClick={() => setTimeframe(2)}
              className={timeframe === 2 ? "selected" : ""}
            >
              1M
            </button>
          </div>
          <div className="chart"></div>

          <DefaultButton title="View More" type={0} align={2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
