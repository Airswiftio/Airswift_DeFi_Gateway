import React, { useState } from "react";
import InfoCard from "../components/cards/InfoCard";
import { Navbar } from "../components/";

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
          <span>Balance Overview</span>
          <div className="buttonSelectors">
            <button onClick={() => setTimeframe(0)}>24H</button>
            <button onClick={() => setTimeframe(1)}>7D</button>
            <button onClick={() => setTimeframe(2)}>1M</button>
          </div>
          <div className="chart"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
