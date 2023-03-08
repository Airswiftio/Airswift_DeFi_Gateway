import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import dayjs from "dayjs";

import { GetPaymentDetail, GetPaymentList } from "@@/utils/request/api";
import { conversionUtcDate, copy_text } from "@@/utils/function";
import QRCodeHistoryTable from "./qrcodeHistoryTable";
import { select_currency } from "@@/utils/config";
import Modal from "@@/components/myassets/modal";
import Alert from "@@/components/PopUp/Alert";
import { Pagination } from "@@/components/";
import "react-tooltip/dist/react-tooltip.css";
import Qrcode from "@@/assets/qr_code.svg";
import Doc from "@@/assets/document.svg";
import "./styles/expense.scss";

const QRCodeTransaction = ({
  selectStatus,
  selectCurrency,
  date,
  search,
  searchTransID,
  setOpenScan,
  setPayoutAddress,
}) => {
  const [page, setPage] = useState(1);
  const [transactionList, setTransactionList] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [itemData, setItemData] = useState({});
  const [openLoading, setOpenLoading] = useState(false);

  const openViewMore = async (item) => {
    const res = await GetPaymentDetail(item?.payment_num);
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to get payment!" });
      return false;
    }
    setItemData(res?.data);
    setIsOpen(true);
  };

  const openScan = async (item) => {
    const res = await GetPaymentDetail(item?.payment_num);
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to get payment!" });
      return false;
    }
    setPayoutAddress(res?.data.pay_out_address);
    setOpenScan(true);
  };

  const pageSize = 5;

  const statusOptions = [
    { key: "", title: "All" },
    { key: "closed", title: "Closed" },
    { key: "success", title: "Success" },
    { key: "pending", title: "Pending" },
    { key: "created", title: "Created" },
  ];

  const getPaymentList = async () => {
    const offset = dayjs().utcOffset();
    const params = {
      // app_id:0,
      page: page,
      size: pageSize,
      status: statusOptions?.[selectStatus]?.key ?? "",
      payment_num: search,
      date: date ?? "",
      display_all: "1",
      tz: offset / 60
    };
    const currencyOptions = select_currency();
    currencyOptions.unshift({ key: "all", title: "All" });
    if (selectCurrency !== null) {
      params.currency_id = currencyOptions?.[selectCurrency]?.id;
    }
    const res = await GetPaymentList(params);
    if (res?.code === 1000) {
      setTransactionTotal(res.data.total);
      // overpay or underpay tag for success status or closed status
      res.data.payments.forEach((item) => {
        if (item?.collection_amount === "0") return;
        if (item?.status === "success") {
          const overpay =
            item?.collection_amount * 1 > item?.order_amount * (1 + item.slippage / 100);
          if (overpay) {
            item.status_name = "overpay";
          }
        }
        if (item?.status === "closed") {
          const underpay =
            item?.collection_amount * 1 < item?.order_amount * (1 - item.slippage / 100);
          if (underpay) {
            item.status_name = "underpay";
          }
        }
      });
      setTransactionList(res.data.payments);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getPaymentList();
  }, [selectStatus, selectCurrency, date, searchTransID]);

  const closeModal = () => {
    setIsOpen(false);
  };

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
      <QRCodeHistoryTable>
        {transactionList.map((item, index) => (
          <div key={index} className="historyElementWrapper">
            <ReactTooltip
              anchorId={"app-item" + index}
              place="bottom"
              content={item?.payment_num}
            />
            <span
              id={"app-item" + index}
              className="over_play cursor_pointer"
              onClick={() => {
                copy_text(item.payment_num) === true
                  ? toast.success("Copy succeeded!")
                  : toast.error("Copy failed!");
              }}
            >
              {item.payment_num}
            </span>
            <span className="status">
              {item.status}
              {item.status_name && <div className="status__tag">{item.status_name}</div>}
            </span>
            <span>ETH</span>
            <span>{item.currency_symbol}</span>
            <span>{conversionUtcDate(item.created_at)}</span>
            <span className="cursor_pointer" onClick={() => openScan(item)}>
              <img src={Qrcode} alt="Qrcode" />
            </span>
            <span className="cursor_pointer" onClick={() => openViewMore(item)}>
              <img src={Doc} alt="View more" />
            </span>
          </div>
        ))}
      </QRCodeHistoryTable>
      <Pagination pages={Math.ceil(transactionTotal / pageSize)} page={page} setPage={setPage} />
    </div>
  );
};

export default QRCodeTransaction;
