import React from "react";

import { SmallCard } from "../../components";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="managementDashboardWrapper">
      <div className="row">
        <div className="sectionOverview">
          <div className="sectionTitle">Merchant Overview</div>
          <div className="cards">
            <SmallCard title="Total Merchants" stat="2729" />
            <SmallCard title="Today's New Merchants" stat="98" />
          </div>
        </div>
        <div className="sectionOverview">
          <div className="sectionTitle">Revenue Overview</div>
          <div className="cards">
            <SmallCard title="Total Revenue" stat="1,5892.98" curr={true} />
            <SmallCard title="Today's Revenue" stat="520.75" curr={true} />
            <SmallCard title="Available Balance" stat="520.75" curr={true} />
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
