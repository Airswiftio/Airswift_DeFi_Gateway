import React, { useEffect, useState } from "react";
import { get } from "./requests";
import { SmallCard } from "../../components";
import useLiquidityPoolTokens from "@@/hooks/useLiquidityPoolTokens";

import "./styles/dashboard.scss";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState();
  const tokens = useLiquidityPoolTokens();

  useEffect(() => {
    const timeZone = new Date().getTimezoneOffset() / -60;
    get(
      setOverviewData,
      `${process.env.REACT_APP_API_URL}/admin/dashboard/overview?tz=${timeZone}`
    );
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
              <div className="title">Pool Balance</div>
              <div className="stat">
                <span className="curr">$</span>
                {tokens.length > 0 &&
                  tokens
                    .map((token) => token.balance)
                    .reduce((acc, cur) => acc + cur)
                    .toFixed(2)}
              </div>
            </div>

            <div className="topTokens">
              <div className="title">Top Tokens</div>
              <div className="tokens">
                <TokenRow id="#" name="Name" tvl="Pool Balance" />
                {tokens.length > 0 &&
                  tokens.map((token, index) => (
                    <TokenRow
                      id={index + 1}
                      key={index}
                      name={token.name}
                      tvl={`$${token.balance.toFixed(2)}`}
                    />
                  ))}
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
