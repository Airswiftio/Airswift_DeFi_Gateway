import React, { useState ,useEffect} from "react";
import { InfoCard, Toggle, Income, Withdraw, Selectors } from "@@/components";

import "./myassets.scss";
import {
  CreatePayment,
  GetAvailableVC,
  GetMerchantBaseSummary,
  GetPaymentSummary,
  GetWithdrawSummary,
  MarkVCInvalid, MarkVCReceived, MerchantWithdraw
} from "@@/utils/request/api";
import {didCreate} from "@@/utils/chain/did";
import {dbSetVC} from "@@/utils/function";

const Assets = () => {
  const [state, setState] = useState(0);
  const [filters, setFilters] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState({total:0,today:0});
  const [withdrawTotal, setWithdrawTotal] = useState({total:0,today:0});

  const getIncomeTotal = async () => {
    const res = await GetPaymentSummary()
    setIncomeTotal({
      total:res?.data?.latest_90_days_total_payment?.toFixed(2) ?? incomeTotal?.total?.toFixed(2),
      today:res?.data?.today_total_payment?.toFixed(2)  ?? incomeTotal?.today?.toFixed(2)})
  }
  const getWithdrawTotal = async () => {
    const res = await GetWithdrawSummary()
    setWithdrawTotal({
      total:res?.data?.latest_90_days_total_withdraw?.toFixed(2) ?? withdrawTotal?.total?.toFixed(2),
      today:res?.data?.today_total_withdraw?.toFixed(2) ?? withdrawTotal?.today?.toFixed(2)})
  }

  const aa = async () => {

    const res0 = await CreatePayment({
      "access_key": "PcBcKtuSzUKdjIVWuDYskfohyntPoxRb",
      "desc": "test",
      "title": "test",
      "amount_in_cent": 1,
      "chain_id": 1,
      "currency": "USDT"
    })
    console.log('res0',res0);

    const res1 = await MarkVCInvalid({vc_ids:['vc4444'],all:true})
    console.log('res1',res1);

    const res2 = await MarkVCReceived({vc_ids:['cZfJRVEeGfAuKBNaokSguxFPYdWpdxes']})
    console.log('res2',res2);
    // const res23 = await MerchantWithdraw({vp: JSON.stringify({aa:'bb'}),to_address:'0x08830907F2e2D20A5CB37eE9E0A8BDf8c06e3508'})
    // console.log('res23',res23);

    const res = await GetAvailableVC()
    dbSetVC(res?.data);
    console.log('res',res);
  }

  useEffect(() => {
    aa();
    // didCreate()
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
