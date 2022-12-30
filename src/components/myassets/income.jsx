import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { HistoryTable, Modal, Pagination } from "../";

import "./income.scss";
import { GetPaymentDetail, GetPaymentList, MarkVCInvalid } from "@@/utils/request/api";
import Doc from "@@/assets/document.svg";
import Verified from "@@/assets/verified.svg";
import {
  addAllVCs,
  array_column,
  array_column2,
  array_values,
  conversionUtcDate,
  copy_text,
  getVCsByIDS
} from "@@/utils/function";
import { getVCs } from "@@/utils/chain/did";
import Alert from "@@/components/PopUp/Alert";
import { select_currency } from "@@/utils/config";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Income = ({ search, selectStatus, selectCurrency, date,searchTransID }) => {
  const [refreshNum, setRefreshNum] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [itemData, setItemData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [alertData, setAlertData] = useState({});
  const statusOptions = [
    { key: "all", title: "All" },
    {key:'closed',title:'Closed'},
    { key: "success", title: "Success" },
    { key: "pending", title: "Pending" },
  ];

  const pageSize = 10;

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

  const getList = async () => {
    console.log(statusOptions?.[selectStatus]?.key ?? "all")
    let params = {
      // app_id:0,
      page: page,
      size: pageSize,
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
      let VCList1 = array_column2(VCList, "vc_id");

      console.log("3",payments_data )

      payments_data.map((item, index) => {
        item.vc_status = 'none';
        if(item.status === 'success'){
          if(item?.vcs?.[0]?.vc_status === 'Invalid'){
            item.vc_status = 'none';
          }
          else if(item?.vcs?.[0]?.vc_status === 'Withdraw' || item?.vcs?.[0]?.vc_status === 'Processing'){
            item.vc_status = 'yes';
          }
          else if(item?.vcs?.[0]?.vc_status === 'Created' || item?.vcs?.[0]?.vc_status === 'Active'){
            item.vc_status = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? 'yes' : 'lose';
          }

          let this_vc = VCList1?.[item?.vcs?.[0]?.vcid];
          if(this_vc){
            this_vc.is_get = 1;
            this_vc.trans_id = item?.payment_num;
            this_vc.currency = item?.currency_symbol;
            this_vc.amount = item?.amount;
            this_vc.vc_status = item?.vcs?.[0]?.vc_status;
            this_vc.time = item?.created_at;
            VCList1[item?.vcs?.[0]?.vcid] = this_vc;
          }
        }
        item.vc_exist = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? true : false;
        return item;
      });

      const vc_data = array_values(VCList1);
      if(vc_data?.length > 0){
        await addAllVCs(vc_data);
      }
      console.log('VCList1',VCList1);
      console.log('aa',array_values(VCList1));

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
  }, [searchTransID, selectStatus, selectCurrency, date]);

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

      <Popup
          open={openLoading}
          closeOnDocumentClick={false}
          onClose={() => setOpenLoading(false)}
          overlayStyle = {{ background: 'rgba(0,0,0,0.8)' }}
      >
        <div className="loading"> Waiting ... </div>
      </Popup>
      <HistoryTable>
        {dataList.map((item, index) => (
          <div key={index} className="historyElementWrapper">
            <ReactTooltip
                anchorId={'app-item'+index}
                place="bottom"
                content={item?.payment_num}
            />
            <span
                id={'app-item'+index}
                className="over_play cursor_pointer"
                onClick={ () => {
                  copy_text(item.payment_num) === true ? toast.success('Copy succeeded!') : toast.error('Copy failed!')
                }}
            >{item.payment_num}</span>
            <span>{item.status}</span>
            <span>{item.currency_symbol}</span>
            <span>{item.amount}</span>
            <span>{conversionUtcDate(item.created_at)}</span>
            <span className="cursor_pointer" onClick={() => openViewMore(item)}>
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
      <Pagination pages={Math.ceil(dataTotal / pageSize)} page={page} setPage={setPage} />
    </div>
  );
};

export default Income;
