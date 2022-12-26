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
    { key: "all", title: "All" },
    {key:'closed',title:'Closed'},
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
    console.log(statusOptions?.[selectStatus]?.key ?? "all")
    let params = {
      // app_id:0,
      page: page,
      size: pagesize,
      status: statusOptions?.[selectStatus]?.key ?? "all",
      payment_num: search,
      date: date ?? "",
    };
    const currencyOptions = select_currency();
    currencyOptions.unshift({ key: "all", title: "All"});
    if (selectCurrency !== null) {
      params.currency_id = currencyOptions?.[selectCurrency]?.id;
    }
    const res = await GetPaymentList(params);
    console.log("Payments: ", res);
    if (res?.code === 1000) {
      let payments_data = res?.data?.payments ?? [];

      console.log("1",payments_data )

      //Only success status can have vc
      let VCids = [];
      payments_data.map((item, index) => {
        if(item.status === 'success' && item?.vcs?.[0]?.vcid){
          VCids = [...VCids, item?.vcs?.[0]?.vcid];
        }
        return item;
      });

      console.log("VC", VCids )

      console.log("2",payments_data )
      // VCids=VCids.filter(Boolean);
      let VCList = await getVCsByIDS(VCids);
      console.log("VC", VCList )
      let VCExistIDS = array_column(VCList, "vc_id");

      console.log("3",payments_data )

      payments_data.map((item, index) => {
        item.vc_status = 'none';
        if(item.status === 'success'){
          item.vc_status = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? 'yes' : 'lose';
        }
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
  }, [ page, refreshNum]);

  useEffect(() => {
    if(page === 1){
      getList();
    }
    setPage(1)
  }, [search, selectStatus, selectCurrency, date]);

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
            {item?.vc_status === 'lose' &&
                (
                    <div className="RestoreVC" onClick={() => RestoreVC(item?.vcs?.[0]?.vcid)}>
                      <div>Restore VC</div>
                    </div>
                )
            }
            {item?.vc_status === 'yes' &&
                (
                    <span><img src={Verified} alt="Verified" /></span>
                )
            }
            {item?.vc_status === 'none' &&
                (
                    <span>None</span>
                )
            }
          </div>
        ))}
      </HistoryTable>
      <Pagination pages={Math.ceil(dataTotal / pagesize)} page={page} setPage={setPage} />
    </div>
  );
};

export default Income;
