import React, { useEffect, useState } from "react";
import { get } from "./requests";
import { SmallCard } from "../../components";

import "./styles/dashboard.scss";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState();

  useEffect(() => {
    get(setOverviewData, "/api/admin/dashboard/overview");
  }, []);

  return (
    <div className="managementDashboardWrapper">
      <div className="row">
        <div className="sectionOverview">
          <div className="sectionTitle">Merchant Overview</div>
          <div className="cards">
            <SmallCard title="Total Merchants" stat={overviewData?.total_merchant_count} />
            <SmallCard
              title="Today's New Merchants"
              stat={overviewData?.today_new_merchant_count}
            />
          </div>
        </div>
        <div className="sectionOverview">
          <div className="sectionTitle">Revenue Overview</div>
          <div className="cards">
            <SmallCard
              title="Total Revenue"
              stat={overviewData?.total_revenue_amount.toFixed(5)}
              curr={true}
            />
            <SmallCard
              title="Today's Revenue"
              stat={overviewData?.today_revenue_amount.toFixed(5)}
              curr={true}
            />
            <SmallCard
              title="Available Balance"
              stat={overviewData?.available_balance_amount.toFixed(5)}
              curr={true}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="liquiditySection">
          <div className="sectionTitle">Liquidity Pool Overview</div>
          <div className="cards">
            <div className="tvl">
              <div className="title">Total Value Locked</div>
              <div className="stat">
                <span className="curr">$</span>
                3.47b
              </div>
            </div>

            <div className="topTokens">
              <div className="title">Top Tokens</div>
              <div className="tokens">
                <TokenRow id="#" name="Name" tvl="TVL" />
                <TokenRow id="1" name="Ether (ETH)" tvl="$928.85m" />
                <TokenRow id="2" name="TRC 20 - USDC" tvl="$846.80m" />
                <TokenRow id="3" name="ERC 20 - USDC" tvl="$218.26m" />
                <TokenRow id="4" name="Wrapped Bitcoin (WBTC)" tvl="$150.03m" />
                <TokenRow id="5" name="TRC 20 - USDT" tvl="$120.15m" />
                <TokenRow id="6" name="ERC 20 - USDT" tvl="$110.53m" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenRow = ({ id, name, tvl }) => {
  return (
    <div className="tokenRow">
      <span className="id">{id}</span>
      <span className="name">{name}</span>
      <span className="val">{tvl}</span>
    </div>
  );
};

export default Dashboard;
