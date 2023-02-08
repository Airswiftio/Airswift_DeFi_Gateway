import React, { useState, useEffect } from "react";
import { InfoCard,  Datepicker,  DropdownNew } from "@@/components";

import "./styles/expenseManagement.scss";
import {get_exchange_rate, get_shop_currency_symbol } from "@@/utils/config";

import { get as httpGet } from "@@/utils/request/http";
import Expense from "@@/pages/management/expense";

const ExpenseManagement = () => {
  const [selectStatus, setSelectStatus] = useState();
  const [selectType, setSelectType] = useState();
  const [date, setDate] = useState();
  const [initial, setInitial] = useState(true);
  const [expenseTotal, setExpenseTotal] = useState({total: 0, today: 0});

  const getExpenseTotal = async () => {
    const local_tz = new Date().getTimezoneOffset() / -60;
    const res = await httpGet("/admin/expense/summary", {
      tz: local_tz,
    });
    const currency_symbol = await get_shop_currency_symbol();
    const exchange_rate = await get_exchange_rate();
    const total = ((res?.data?.latest_90_days_total_expense ?? expenseTotal?.total) * exchange_rate).toFixed(2);
    const today = ((res?.data?.today_total_expense ?? expenseTotal?.today) * exchange_rate).toFixed(2);
    setExpenseTotal({
      total: currency_symbol + ' ' + total,
      today: currency_symbol + ' ' + today,
    });
  }
  
  const statusOptions = [
    { key: "all", title: "All"},
    { key: "success", title: "Success" },
    { key: "fail", title: "Fail" },
  ];
  // console.log(statusOptions, "statusOptions");

  const typeOptions = [{ key: "lpswitch", title: "LpSwitch" }];
  typeOptions.unshift({ key: "all", title: "All"});
  // console.log(typeOptions, "typeOptions");

  useEffect(() => {
    getExpenseTotal();
  }, []);

  return (
    <div>
      <div className="assetsContent">
        <div className="cardRow">
          <InfoCard
            title="Total Expense"
            value={expenseTotal.total}
            type={1}
            key_index={1}
          />
          <InfoCard
            title="Today's Expense"
            value={ expenseTotal.today }
            type={2}
            key_index={2}
          />
        </div>
        <div className="history">
          <span className="title">Expense History</span>
          <div className="selectorsWrapper">
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={ statusOptions }
              defaultTitle="Status"
              selected={selectStatus}
              setSelected={setSelectStatus}
            />
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={typeOptions}
              defaultTitle="Type"
              selected={selectType}
              setSelected={setSelectType}
            />
            <Datepicker date={date} setDate={setDate} initial={initial} setInitial={setInitial} />
          </div>
          <Expense
            selectStatus={selectStatus}
            selectType={selectType}
            date={date}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseManagement;
