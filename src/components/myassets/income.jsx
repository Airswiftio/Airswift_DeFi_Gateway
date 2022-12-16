import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { HistoryTable, Modal, Pagination } from "../";

import "./income.scss";
import { GetPaymentDetail, GetPaymentList, MarkVCInvalid } from "@@/utils/request/api";
import Doc from "@@/assets/document.svg";
import Verified from "@@/assets/verified.svg";
import { array_column, conversionUtcDate, getVCsByIDS } from "@@/utils/function";
import { getVCs } from "@@/utils/chain/did";
import Alert from "@@/components/PopUp/Alert";
import { select_currency } from "@@/utils/config";

const Income = ({ search, selectStatus, selectCurrency, date }) => {
  const [refreshNum, setRefreshNum] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [itemData, setItemData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const statusOptions = [
    { key: "success", title: "Success" },
    { key: "pending", title: "Pending" },
  ];

  const pagesize=3;

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const RestoreVC = async (vc_id) => {
    const res = await MarkVCInvalid({
      vc_ids: [vc_id],
      all: true,
    });
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to reset vc!" });
      return false;
    }
    setTimeout(async function () {
      await getVCs();
      setRefreshNum(refreshNum + 1);
    }, 5000);
  };

  const getList = async () => {
    let params = {
      // app_id:0,
      page: page+1,
      size: pagesize,
      status: statusOptions?.[selectStatus]?.key ?? "all",
      payment_num: search,
      date: date ?? "",
    };
    if (selectCurrency !== null) {
      params.currency_id = select_currency()?.[selectCurrency]?.id;
    }
    const res = await GetPaymentList(params);
    console.log("Payments: ", res);
    if (res?.code === 1000) {
      let payments_data = res?.data?.payments ?? [];

      console.log("1",payments_data )

      let VCids = [];
      payments_data.map((item, index) => {
        VCids = [...VCids, item?.vcs?.[0]?.vcid];
        return item;
      });

      console.log("VC", VCids )

      console.log("2",payments_data )

      let VCList = await getVCsByIDS(VCids);
      console.log("VC", VCList )
      let VCExistIDS = array_column(VCList, "vc_id");

      console.log("3",payments_data )

      payments_data.map((item, index) => {
        item.vc_exist = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? true : false;
        return item;
      });
      // console.log('rrd',rrd);
      console.log("4",payments_data )
      setDataList(payments_data);
      setDataTotal(res?.data?.total);
    }
  };

  useEffect(() => {
    // alert(page+1);
    getList();
    console.log( "total page", parseInt(dataTotal / 10))
  }, [search, selectStatus, selectCurrency, date, page, refreshNum]);

  useEffect(() => {
    getVCs();
    getList();
    // getWithdrawTotal();
  }, []);

  return (
    <div className="incomeWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <Modal click={closeModal} data={itemData} />
      </Popup>
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      <HistoryTable>
        {dataList.map((item, index) => (
          <div key={index} className="historyElementWrapper">
            <span>{item.payment_num}</span>
            <span>{item.status}</span>
            <span>{item.currency_symbol}</span>
            <span>{item.amount}</span>
            <span>{conversionUtcDate(item.created_at)}</span>
            <span onClick={() => openViewMore(item)}>
              <img src={Doc} alt="View more" />
            </span>
            {item?.vc_exist === false &&
            ["Created", "Active"].includes(item?.vcs?.[0]?.vc_status) ? (
              <div className="RestoreVC" onClick={() => RestoreVC(item?.vcs?.[0]?.vcid)}>
                <div>Restore VC</div>
              </div>
            ) : (
              <span>
                <img src={Verified} alt="Verified" />
              </span>
            )}
          </div>
        ))}
      </HistoryTable>
      <Pagination pages={parseInt(dataTotal / pagesize)+1} page={page} setPage={setPage} />
    </div>
  );
};

export default Income;
