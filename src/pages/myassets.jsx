import React, { useState ,useEffect} from "react";
import { InfoCard, Toggle, Income, Withdraw, Selectors } from "@@/components";

import "./myassets.scss";
import {GetMerchantBaseSummary, GetPaymentSummary, GetWithdrawSummary} from "@@/utils/request/api";
import {didCreate} from "@@/utils/chain/did";

const Assets = () => {
  const [state, setState] = useState(0);
  const [filters, setFilters] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState({total:0,today:0});
  const [withdrawTotal, setWithdrawTotal] = useState({total:0,today:0});

  const getIncomeTotal = async () => {
    const res = await GetPaymentSummary()
    //todo 999 根据汇率计算
    if(res?.code === 1000){
      setIncomeTotal({total:res?.msg?.latest_90_days_total_payment?.toFixed(3) ?? 0,today:res?.msg?.today_total_payment?.toFixed(3) ?? 0})
    }
  }
  const getWithdrawTotal = async () => {
    const res = await GetWithdrawSummary()
    //todo 999 根据汇率计算
    if(res?.code === 1000){
      setWithdrawTotal({total:res?.msg?.latest_90_days_total_withdraw?.toFixed(3) ?? 0,today:res?.msg?.today_total_withdraw?.toFixed(3) ?? 0})
    }
  }

  useEffect(() => {
    didCreate()
    getIncomeTotal();
    getWithdrawTotal();
  }, []);

  return (
    <div>
      <div className="assetsContent">
        <Toggle toggle={setState} state={state} />
        <div className="cardRow">
          <InfoCard
            title={state === 0 ? "Total Income" : "Total Withdraw"}
            value={state === 0 ? incomeTotal.total : withdrawTotal.total}
            type={1}
          />
          <InfoCard
            title={state === 0 ? "Today's Income" : "Available Balance"}
            value={state === 0 ? incomeTotal.today : withdrawTotal.today}
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
