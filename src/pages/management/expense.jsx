import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { Modal, Pagination } from "@@/components/";

import "./styles/expense.scss";
import { conversionUtcDate, copy_text } from "@@/utils/function";
import Alert from "@@/components/PopUp/Alert";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { get as httpGet } from "@@/utils/request/http";
import ExpenseHistoryTable from "./expenseHistoryTable";

const Expense = ({ selectStatus, selectType, date }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [itemData, setItemData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [alertData, setAlertData] = useState({});

  const statusOptions = [
    { key: "all", title: "All" },
    { key: "success", title: "Success" },
    { key: "fail", title: "Fail" },
  ];

  const typeOptions = [
    { key: "all", title: "All" },
    { key: "lpswitch", title: "LpSwitch" },
  ];

  const pageSize = 10;

  const closeModal = () => {
    setIsOpen(false);
  };

  const getExpenseList = async () => {
    const res = await httpGet("/admin/expense/list", {
      page: page,
      size: pageSize,
      status: statusOptions?.[selectStatus]?.key ?? "all",
      type: typeOptions?.[selectType]?.key ?? "all",
      date: date ?? "",
    });
    if (res?.code === 1000) {
      setExpenseTotal(res.data.total);
      setExpenseList(res.data.expenses);
    }
  };

  useEffect(() => {
    getExpenseList();
  }, [page ]);

  useEffect(() => {
    if (page === 1) {
      getExpenseList();
    }
    setPage(1);
  }, [selectStatus, selectType, date]);

  return (
    <div className="expenseWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <Modal click={closeModal} data={itemData} />
      </Popup>
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>

      <Popup
        open={openLoading}
        closeOnDocumentClick={false}
        onClose={() => setOpenLoading(false)}
        overlayStyle={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="loading"> Waiting ... </div>
      </Popup>
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
            <span className="over_play">{item.amount}</span>
            <span>{conversionUtcDate(item.created_at)}</span>
          </div>
        ))}
      </ExpenseHistoryTable>
      <Pagination pages={Math.ceil(expenseTotal / pageSize)} page={page} setPage={setPage} />
    </div>
  );
};

export default Expense;
