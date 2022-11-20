import React, { useState ,useEffect} from "react";
import {InfoCard, Toggle, Income, Withdraw, Selectors, Dropdown, Datepicker, Search, DropdownNew} from "@@/components";

import "./myassets.scss";
import {
  CreatePayment,
  GetAvailableVC,
  GetMerchantBaseSummary,
  GetPaymentSummary,
  GetWithdrawSummary,
  MarkVCInvalid, MarkVCReceived, MerchantWithdraw
} from "@@/utils/request/api";
import {createVP, didCreate, getVCs, SimonCreateDID} from "@@/utils/chain/did";
import {addOneLocal} from "@@/utils/function";
import {base_currency, select_currency} from "@@/utils/config";
import moment from "moment";
import {dbSet} from "@@/utils/db/browserDb";
import {base58Encode1} from "@@/utils/chain/wallet";

const Assets = () => {
  const [state, setState] = useState(0);
  const [filters, setFilters] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState({total:0,today:0});
  const [withdrawTotal, setWithdrawTotal] = useState({total:0,today:0});

  const [selectStatus, setSelectStatus] = useState();
  const [selectCurrency, setSelectCurrency] = useState();
  const [date, setDate] = useState();
  const [search, setSearch] = useState('');
  const statusOptions = [
    {key:'success',title:'Finished'},
    {key:'pending',title:'Pending'},
  ];
  const WithdrawStatus = [
    {key:'complete',title:'Complete'},
    {key:'pending',title:'Pending'},
  ];
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


  useEffect(() => {
    setSelectStatus(null)
    setSelectCurrency(null)
    setDate(null)
    setSearch('')
  }, [state]);
  useEffect( () => {
    // const did = SimonCreateDID()
    // console.log('did',did);
    getIncomeTotal();
    getWithdrawTotal();
    getVCs()
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


          <div className="selectorsWrapper">
            <DropdownNew
                buttonStyle={{width:'150px'}}
                options={state === 0 ? statusOptions : WithdrawStatus}
                defaultTitle="Status"
                selected={selectStatus}
                setSelected={setSelectStatus}
             />
            <DropdownNew
                buttonStyle={{width:'150px'}}
                options={select_currency()}
                defaultTitle="Currency"
                selected={selectCurrency}
                setSelected={setSelectCurrency}
            />
            <Datepicker
                date={date}
                setDate={setDate}
            />
            <Search
                search={search}
                setSearch={setSearch}
            />
          </div>
          {/*<Selectors setFilters={setFilters} filters={filters} />*/}
          {state === 0
              ? <Income
                  selectStatus={selectStatus}
                  selectCurrency={selectCurrency}
                  date={date}
                  search={search}
              />
              : <Withdraw
                  selectStatus={selectStatus}
                  selectCurrency={selectCurrency}
                  date={date}
                  search={search}
              />}
        </div>
      </div>
    </div>
  );
};

export default Assets;
