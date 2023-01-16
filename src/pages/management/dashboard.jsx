import React, { useEffect, useState } from "react";
import { get } from "./requests";
import { SmallCard } from "../../components";
import { get as httpGet} from '@@/utils/request/http'
import { ethers, signer } from '@@/utils/chain/chainBase';

import "./styles/dashboard.scss";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState();
  const [tokens, setTokens] = useState();
  
  const getLiquidityPoolData = async () => {
    // pool balance from smart contract
    const jsonAbi = `[
      {
         "inputs":[
            {
               "internalType":"address",
               "name":"token",
               "type":"address"
            }
         ],
         "name":"getPoolBalanceViaToken",
         "outputs":[
            {
               "internalType":"uint256",
               "name":"balance",
               "type":"uint256"
            }
         ],
         "stateMutability":"view",
         "type":"function"
      }
    ]`
    const Contract = new ethers.Contract("0x33e69a4630654CD6cA7104a7C696cc0065426f68", jsonAbi, signer);
    const balance = {};
    balance.USDC =  ethers.utils.formatEther(await Contract.getPoolBalanceViaToken("0x4600029b3b2426d627dFde7d57AbCFdC96aEC147"));
    balance.DAI = ethers.utils.formatEther(await Contract.getPoolBalanceViaToken("0x581857409579161Dabd2C4994f78b2F1B3671bc2"));
    console.log("balace", balance);

    // exchange rate
    const rates = await fetch("https://api.coinbase.com/v2/exchange-rates")
                        .then(res => res.json())
                        .then(resJson => resJson.data.rates);
    console.log("rates", {USDC: rates.USDC, DAI: rates.DAI});
    
    // convert to usd
    setTokens([{ USDC: balance.USDC * rates.USDC }, { DAI: balance.DAI * rates.DAI }]);
  }

  useEffect(() => {
    const timeZone = new Date().getTimezoneOffset() / -60;
    get(setOverviewData, `${process.env.REACT_APP_API_URL}/admin/dashboard/overview?tz=${timeZone}`);
    getLiquidityPoolData();
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
                {tokens && (tokens.reduce((acc, cur) => 
                  Object.values(acc)[0] + Object.values(cur)[0]))
                  .toFixed(2)
                }
              </div>
            </div>

            <div className="topTokens">
              <div className="title">Top Tokens</div>
              <div className="tokens">
                <TokenRow id="#" name="Name" tvl="TVL" />
                {tokens && tokens.map((token, index) => 
                  <TokenRow id={index + 1} key={index} name={Object.keys(token)[0]} tvl={`$${Object.values(token)[0].toFixed(2)}`} />)
                }
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
