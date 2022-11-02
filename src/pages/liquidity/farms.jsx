import React, { useState } from "react";
import Popup from "reactjs-popup";
import { FarmCard, DepositModal, WithdrawModal } from "../../components/";
import { DAI, ETH, USDC, USDT, WBTC } from "../../assets/liquidity";

import "./farms.scss";

const Farms = () => {
  return (
    <div className="farmsWrapper">
      <FarmCard icon={DAI} title="DAI" />
      <FarmCard icon={ETH} title="ETH" />
      <FarmCard icon={USDC} title="USDC" />
      <FarmCard icon={USDT} title="USDT" />
      <FarmCard icon={WBTC} title="WBTC" />
    </div>
  );
};

export default Farms;
