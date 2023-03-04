import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { addAllVCs, array_column, array_column2, array_values, getVCsByIDS } from "@@/utils/function";
import { GetPaymentDetail, GetPaymentList, MarkVCInvalid } from "@@/utils/request/api";
import Table from "@@/components/admin/Table"
import Alert from "@@/components/PopUp/Alert";
import { getVCs } from "@@/utils/chain/did";
import { Modal } from "../";
import "./income.scss";

const IncomeHistory = () => {
  const [refreshNum, setRefreshNum] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [itemData, setItemData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [filters, setFilters] = useState({status: "", currency_id: "", date: "", payment_num: ""});
  const [page, setPage] = useState(1);

  const rowsPerPage= 5;

  const handleViewMore = async (payment_num) => {
    const res = await GetPaymentDetail(payment_num);
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

  const handleVc = async (vc_id) => {
    setOpenLoading(true);
    const res = await MarkVCInvalid({
      vc_ids: [vc_id],
      // all: true,
    });
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: "Failed to reset vc!" });
      return false;
    }
    setTimeout(async function () {
      await getVCs();
      setOpenLoading(false);
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

  const addVcStatus = (item, VCExistIDS) => {
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
      item.vcStatus = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? "yes" : "lose";
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
    const params = {
      // app_id:0,
      page: page,
      size: rowsPerPage,
      status: filters.status,
      payment_num: filters.payment_num,
      date: filters.date,
      currency_id: filters.currency_id,
      display_all: 0
    };
    const res = await GetPaymentList(params);
    console.log("Payments: ", res);
    if (res?.code === 1000) {
      let payments_data = res?.data?.payments ?? [];

      console.log("1", payments_data);

      //Only success status can have vc
      let VCids = [];
      payments_data.map((item, index) => {
        if ((item.status === "success" || item.status === "closed") && item?.vcs?.[0]?.vcid) {
          VCids = [...VCids, item?.vcs?.[0]?.vcid];
        }
        return item;
      });

      console.log("VC", VCids);

      console.log("2", payments_data);
      // VCids=VCids.filter(Boolean);
      let VCList = await getVCsByIDS(VCids);
      console.log("VC", VCList);
      let VCExistIDS = array_column(VCList, "vc_id");
      let VCList1 = array_column2(VCList, "vc_id");

      console.log("3", payments_data);

      payments_data.map((item, index) => {
        item.vc_status = "none";
        if (item.status === "success" || (item.status === "closed" && item?.vcs?.length > 0)) {
          addStatusTag(item);
          addVcStatus(item, VCExistIDS);
          addVcToList(item, VCList1);
        }
        item.vc_exist = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? true : false;
        return item;
      });

      const vc_data = array_values(VCList1);
      if (vc_data?.length > 0) {
        await addAllVCs(vc_data);
      }
      console.log("VCList1", VCList1);
      console.log("aa", array_values(VCList1));

      // console.log('rrd',rrd);
      console.log("4", payments_data);
      setDataList(payments_data);
      setDataTotal(res?.data?.total);
    }
  };

  useEffect(() => {
    getList();
  }, [page, refreshNum, filters]);

  useEffect(() => {
    getVCs();
    // getWithdrawTotal();
  }, []);
  
  const columns = [
    { accessor: 'payment_num', label: 'Trans ID' },
    { accessor: 'status', label: 'Status' },
    { accessor: 'currency_symbol', label: 'Currency' },
    { accessor: 'amount', label: 'Amount' },
    { accessor: 'created_at', label: 'Time' },
    { accessor: 'view_more', label: 'View More', handler: handleViewMore },
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
      <Table title="Income History" columns={columns} rows={dataList} count={dataTotal} rowsPerPage={rowsPerPage}  options={options} filters={filters} setFilters={setFilters} activePage={page} setActivePage={setPage}/>
    </>
  );
};

export default IncomeHistory;
