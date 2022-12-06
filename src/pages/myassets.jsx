import React, { useState, useEffect } from "react";
import { InfoCard, Toggle, Income, Withdraw, Datepicker, Search, DropdownNew } from "@@/components";

import "./myassets.scss";
import { GetPaymentSummary, GetWithdrawSummary } from "@@/utils/request/api";
import { getVCs } from "@@/utils/chain/did";
import { select_currency } from "@@/utils/config";

const Assets = () => {
  const [state, setState] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState({ total: 0, today: 0 });
  const [withdrawTotal, setWithdrawTotal] = useState({ total: 0, today: 0 });
  const [selectStatus, setSelectStatus] = useState();
  const [selectCurrency, setSelectCurrency] = useState();
  const [date, setDate] = useState();
  const [search, setSearch] = useState("");
  const statusOptions = [
    { key: "success", title: "Success" },
    { key: "pending", title: "Pending" },
  ];
  const WithdrawStatus = [
    { key: "complete", title: "Complete" },
    { key: "pending", title: "Pending" },
  ];
  const getIncomeTotal = async () => {
    const res = await GetPaymentSummary({ tz: new Date().getTimezoneOffset() / -60 });
    setIncomeTotal({
      total: res?.data?.latest_90_days_total_payment?.toFixed(2) ?? incomeTotal?.total?.toFixed(2),
      today: res?.data?.today_total_payment?.toFixed(2) ?? incomeTotal?.today?.toFixed(2),
    });
  };
  const getWithdrawTotal = async () => {
    const res = await GetWithdrawSummary({ tz: new Date().getTimezoneOffset() / -60 });
    setWithdrawTotal({
      total:
        res?.data?.latest_90_days_total_withdraw?.toFixed(2) ?? withdrawTotal?.total?.toFixed(2),
      today: res?.data?.today_total_withdraw?.toFixed(2) ?? withdrawTotal?.today?.toFixed(2),
    });
  };

  useEffect(() => {
    setSelectStatus(null);
    setSelectCurrency(null);
    setDate(null);
    setSearch("");
  }, [state]);
  useEffect(() => {
    // console.log('did',did);

    getIncomeTotal();
    getWithdrawTotal();
    getVCs();
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
          <span className="title">{state === 0 ? "Income" : "Withdraw"} History</span>
          <div className="selectorsWrapper">
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={state === 0 ? statusOptions : WithdrawStatus}
              defaultTitle="Status"
              selected={selectStatus}
              setSelected={setSelectStatus}
            />
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={select_currency()}
              defaultTitle="Currency"
              selected={selectCurrency}
              setSelected={setSelectCurrency}
            />
            <Datepicker date={date} setDate={setDate} />
            <Search search={search} setSearch={setSearch} />
          </div>
          {/*<Selectors setFilters={setFilters} filters={filters} />*/}
          {state === 0 ? (
            <Income
              selectStatus={selectStatus}
              selectCurrency={selectCurrency}
              date={date}
              search={search}
            />
          ) : (
            <Withdraw
              selectStatus={selectStatus}
              selectCurrency={selectCurrency}
              date={date}
              search={search}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
