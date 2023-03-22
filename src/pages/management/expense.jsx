import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";

import { conversionUtcDate, copy_text } from "@@/utils/function";
import ExpenseHistoryTable from "./expenseHistoryTable";
import { get as httpGet } from "@@/utils/request/http";
import { Pagination } from "@@/components/";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/expense.scss";

const Expense = ({ selectStatus, selectType, date }) => {
  const [page, setPage] = useState(1);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const pageSize = 10;

  const getExpenseList = async () => {
    const res = await httpGet("/admin/expense/list", {
      page: page,
      size: pageSize,
      status: selectStatus,
      type: selectType,
      date: date,
    });
    if (res?.code === 1000) {
      setExpenseTotal(res.data.total);
      setExpenseList(res.data.expenses);
    }
  };

  useEffect(() => {
    getExpenseList();
  }, [page]);

  useEffect(() => {
      setPage(1);
      getExpenseList();
  }, [selectStatus, selectType, date]);

  const getCurrencyType = (chainName) => {
    if (chainName === "Ethereum") return "ETH";
    if (chainName === "Harmony") return "ONE";
  }
  
  return (
    <div className="expenseWrapper">
      <ExpenseHistoryTable>
        {expenseList.map((item, index) => (
          <div key={index} className="historyElementWrapper">
            <ReactTooltip anchorId={"app-item" + index} place="bottom" content={item?.tx_hash} />
            <span
              id={"app-item" + index}
              className="over_play cursor_pointer"
              onClick={() => {
                copy_text(item.tx_hash) === true
                  ? toast.success("Copy succeeded!")
                  : toast.error("Copy failed!");
              }}
            >
              {item.tx_hash}
            </span>
            <span>{item.status}</span>
            <span>{item.chain_name}</span>
            <span>{item.type}</span>
            <span className="over_play" style={{ width: "200px" }}>{item.amount.toFixed(19)} {getCurrencyType(item.chain_name)}</span>
            <span>{conversionUtcDate(item.created_at)}</span>
          </div>
        ))}
      </ExpenseHistoryTable>
      <Pagination pages={Math.ceil(expenseTotal / pageSize)} page={page} setPage={setPage} />
    </div>
  );
};

export default Expense;
