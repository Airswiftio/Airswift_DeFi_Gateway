import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";

import {get_exchange_rate, get_shop_currency_symbol } from "@@/utils/config";
import { GetPaymentSummary, GetWithdrawSummary } from "@@/utils/request/api";
import WithdrawHistory from "@@/components/myassets/WithdrawHistory";
import IncomeHistory from "@@/components/myassets/IncomeHistory";
import { InfoCard, Toggle } from "@@/components";
import { getVCs } from "@@/utils/chain/did";
import "./myassets.scss";

const Assets = ({state, setState}) => {
  const state_data = useLocation()?.state;
  const [incomeTotal, setIncomeTotal] = useState({ total: 0, today: 0 });
  const [withdrawTotal, setWithdrawTotal] = useState({ total: 0, today: 0 });
  const local_tz = new Date().getTimezoneOffset() / -60

  const getIncomeTotal = async () => {
    const res = await GetPaymentSummary({ tz: local_tz });
    console.log("income total",res)
    let currency_symbol = await get_shop_currency_symbol();
    let exchange_rate = await get_exchange_rate();
    let total = ((res?.data?.latest_90_days_total_payment ?? incomeTotal?.total) * exchange_rate).toFixed(2);
    let today = ((res?.data?.today_total_payment ?? incomeTotal?.today) * exchange_rate).toFixed(2);
    setIncomeTotal({
      total: currency_symbol + ' ' + total,
      today: currency_symbol + ' ' + today,
    });
  };

  const getWithdrawTotal = async () => {
    const res = await GetWithdrawSummary({ tz: local_tz });
    let currency_symbol = await get_shop_currency_symbol();
    let exchange_rate = await get_exchange_rate();
    let total = ((res?.data?.latest_90_days_total_withdraw ?? withdrawTotal?.total) * exchange_rate).toFixed(2);
    let today = ((res?.data?.today_total_withdraw ?? withdrawTotal?.today) * exchange_rate).toFixed(2);
    setWithdrawTotal({
      total: currency_symbol + ' ' + total,
      today: currency_symbol + ' ' + today,
    });
  };

  useEffect(() => {
    getIncomeTotal();
    getWithdrawTotal();
    getVCs();
    setState(state_data?.status ?? 0);
  }, []);

  return (
      <div className="assetsContent">
        <Toggle setState={setState} state={state} />
        <div className="cardRow">
          <InfoCard
            title={state === 0 ? "Total Income" : "Total Withdraw"}
            value={state === 0 ? incomeTotal.total : withdrawTotal.total}
            type={1}
            key_index={1}
          />
          <InfoCard
            title={state === 0 ? "Today's Income" : "Today's Withdraw"}
            value={state === 0 ? incomeTotal.today : withdrawTotal.today}
            type={2}
            key_index={2}
          />
        </div>
        {state === 0 ? <IncomeHistory /> : <WithdrawHistory />} 
      </div>
  );
};

export default Assets;
