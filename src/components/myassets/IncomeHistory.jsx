import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import dayjs from "dayjs";

import { GetPaymentDetail, GetPaymentList, MarkVCInvalid } from "@@/utils/request/api";
import { addAllVCs, array_values, getVCsByIDS } from "@@/utils/function";
import Table from "@@/components/admin/Table";
import Alert from "@@/components/PopUp/Alert";
import { getVCs } from "@@/utils/chain/did";
import { Modal } from "../";

const IncomeHistory = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [refreshNum, setRefreshNum] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [viewMore, setViewMore] = useState(false);
  const [itemData, setItemData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({});

  const rowsPerPage= 5;

  const handleViewMore = async (item) => {
    const res = await GetPaymentDetail(item.payment_num);
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to get payment!" });
      return false;
    }
    setItemData(res?.data);
    setViewMore(true);
  };

  const handleVc = async (vc_id) => {
    setLoading(true);
    const res = await MarkVCInvalid({
      vc_ids: [vc_id],
    });
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to reset vc!" });
      return false;
    }
    setTimeout(async function () {
      await getVCs();
      setLoading(false);
      setRefreshNum(refreshNum + 1);
    }, 5000);
  };

  const addStatusTag = (item) => {
    if (item.collection_amount === "0") return;
    // overpay
    if (item.status === "success") {
      const overpay =
        item.collection_amount * 1 > item.order_amount * (1 + item.slippage / 100);
      if (overpay) item.statusTag = "overpay";
    }
    // underpay
    if (item.status === "closed") {
      const underpay =
        item.collection_amount * 1 < item.order_amount * (1 - item.slippage / 100);
      if (underpay) item.statusTag = "underpay";
    }
  }

  const addVcStatus = (item, vcIdsAvailable) => {
    if (item?.vcs?.[0]?.vc_status === "Invalid") {
      item.vcStatus = "none";
    } else if (
      item?.vcs?.[0]?.vc_status === "Withdraw" ||
      item?.vcs?.[0]?.vc_status === "Processing"
    ) {
      item.vcStatus = "yes";
    } else if (
      item?.vcs?.[0]?.vc_status === "Created" ||
      item?.vcs?.[0]?.vc_status === "Active"
    ) {
      item.vcStatus = vcIdsAvailable.includes(item?.vcs?.[0]?.vcid) ? "yes" : "lose";
    }
  }

  const addVcToList = (item, vcList) => {
    let this_vc = vcList?.[item?.vcs?.[0]?.vcid];
    if (this_vc) {
      this_vc.is_get = 1;
      this_vc.trans_id = item?.payment_num;
      this_vc.currency = item?.currency_symbol;
      this_vc.amount = item?.amount;
      this_vc.vc_status = item?.vcs?.[0]?.vc_status;
      this_vc.time = item?.created_at;
      vcList[item?.vcs?.[0]?.vcid] = this_vc;
    }
  }

  const getList = async () => {
    const offset = dayjs().utcOffset();
    const params = {
      page: page,
      size: rowsPerPage,
      status: filters.status ?? "normal",
      currency_id: filters.currency_id,
      date: filters.date,
      payment_num: filters.search,
      display_all: 0,
      tz: offset / 60
    };
    const res = await GetPaymentList(params);
    if (res?.code === 1000) {
      const payments_data = res?.data?.payments ?? [];
      console.log(payments_data, "payments_data");


      //Only success status can have vc
      const vcIds = payments_data.map(payment => {
        if ((payment.status === "success" || payment.status === "closed") && payment?.vcs?.[0]?.vcid) {
          return payment?.vcs?.[0]?.vcid;
        }
      });

      const vcListArr = await getVCsByIDS(vcIds);
      const vcListObj = vcListArr.reduce((acc, cur) => ({...acc, [cur.vc_id]: cur}), {});
      const vcIdsAvailable = vcListArr.map(vc => vc.vc_id);
      payments_data.map(( item ) => {
        item.vc_status = "none";
        if (item.status === "success" || (item.status === "closed" && item?.vcs?.length > 0)) {
          addStatusTag(item);
          addVcStatus(item, vcIdsAvailable);
          addVcToList(item, vcListObj);
        }
        item.vc_exist = vcIdsAvailable.includes(item?.vcs?.[0]?.vcid) ? true : false;
        return item;
      });

      const vc_data = array_values(vcListObj);
      if (vc_data?.length > 0) {
        await addAllVCs(vc_data);
      }

      setDataList(payments_data);
      setDataTotal(res?.data?.total);
    }
  };

  useEffect(() => {
    getList();
  }, [page, refreshNum, filters]);

  useEffect(() => {
    getVCs();
  }, []);
  
  const columns = [
    { accessor: 'payment_num', label: 'Trans ID', notify: true },
    { accessor: 'status', label: 'Status', tag: true },
    { accessor: 'currency_symbol', label: 'Currency' },
    { accessor: 'amount', label: 'Amount', tooltip: "service fee 0.3%" },
    { accessor: 'created_at', label: 'Time', localTime: true },
    { accessor: 'view_more', label: 'View More', handler: handleViewMore, style: {width: "150px"} },
    { accessor: 'vcs', label: 'VCs', handler: handleVc },
  ];

  const options = [
    {
      title: "Status", 
      data: [
        { key: "normal", title: "All" },
        { key: "closed", title: "Closed" },
        { key: "success", title: "Success" },
        { key: "pending", title: "Pending" },
      ],
    }
  ];

  return (
    <>
      <Popup open={viewMore} closeOnDocumentClick onClose={() => setViewMore(false)}>
        <Modal click={() => setViewMore(false)} data={itemData} />
      </Popup>
      <Popup open={loading} closeOnDocumentClick={false} onClose={() => setLoading(false)} overlayStyle={{ background: "rgba(0,0,0,0.8)" }} >
        <div className="loading"> Waiting ... </div>
      </Popup>
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      <Table title="Income History" columns={columns} rows={dataList} count={dataTotal} rowsPerPage={rowsPerPage}  options={options} filters={filters} setFilters={setFilters} activePage={page} setActivePage={setPage}/>
    </>
  );
};

export default IncomeHistory;
