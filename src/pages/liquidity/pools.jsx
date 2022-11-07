import React from "react";
import { PoolCard } from "../../components/";
import { DAI, ETH, USDC, USDT, WBTC } from "../../assets/liquidity";

import "./pools.scss";

const Pools = () => {
  return (
    <div className="poolsWrapper">
      <PoolCard icon={DAI} title="DAI" />
      <PoolCard icon={ETH} title="ETH" />
      <PoolCard icon={USDC} title="USDC" />
      <PoolCard icon={USDT} title="USDT" />
      <PoolCard icon={WBTC} title="WBTC" />
    </div>
  );
};

export default Pools;
