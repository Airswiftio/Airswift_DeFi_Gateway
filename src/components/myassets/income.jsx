import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

import { HistoryTable, Modal, Pagination } from "../";

import "./income.scss";
import {GetPaymentList, MarkVCInvalid} from "@@/utils/request/api";
import Doc from "@@/assets/document.svg";
import Verified from "@@/assets/verified.svg";
import {array_column, getVCsByIDS} from "@@/utils/function";
import {getVCs} from "@@/utils/chain/did";
import Alert from "@@/components/PopUp/Alert";

const Income = ({search,selectStatus,selectCurrency,date}) => {
    const [refreshNum, setRefreshNum] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [itemData, setItemData] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const statusOptions = [
        {key:'success',title:'Finished'},
        {key:'pending',title:'Pending'},
    ];
    const openViewMore = (item) => {
        setIsOpen(true);
        setItemData(item)
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const RestoreVC = async (vc_id) => {
       const res = await MarkVCInvalid({
            vc_ids:[vc_id],
            all:true
        })
        if(res?.code !== 1000){
            setOpenAlert(true)
            setAlertData({msg:'Failed to reset vc!'})
            return false;
        }
        setTimeout(function (){
            //todo 888 加个进度加载
            getVCs()
            setRefreshNum(refreshNum+1)
        }, 50000);

    };

    const getList = async () => {
        let params = {
            // app_id:0,
            page:1,
            size:10,
            status:statusOptions?.[selectStatus]?.key??'success',
            // payment_num:0,
            // currency_id:0,
            date:date??'',
        }
        const res = await GetPaymentList(params)
        if(res?.code === 1000){
            let payments_data = res?.data?.payments ?? [];
            let VCids = [];
            payments_data.map((item,index)=>{
                VCids = [...VCids,item?.vcs?.[0]?.vcid]
                return item
            })

            let VCList = await getVCsByIDS(VCids)
            let VCExistIDS = array_column(VCList,'vc_id')
            payments_data.map((item,index)=>{
                item.vc_exist = VCExistIDS.includes(item?.vcs?.[0]?.vcid) ? true : false;
                return item
            })
            // console.log('rrd',rrd);
            setDataList(payments_data)
            setDataTotal(res?.data?.total)
        }
    }

    useEffect(() => {
        getList();
    }, [search,selectStatus,selectCurrency,date,refreshNum]);

    useEffect(() => {
        getList();
        // getWithdrawTotal();
    }, []);

    return (
        <div className="incomeWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <Modal click={closeModal} data={itemData} />
            </Popup>
            <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
                <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
            </Popup>
            <HistoryTable>
                {dataList.map(
                    (item, index) => (
                        <div key={index} className="historyElementWrapper">
                            <span>{item.payment_num}</span>
                            <span>{item.status}</span>
                            <span>{item.currency_symbol}</span>
                            <span>{item.amount}</span>
                            <span>{item.created_at}</span>
                            <span onClick={()=>openViewMore(item)}><img src={Doc} alt="View more"/></span>
                            {item?.vc_exist === false && ['Created', 'Active'].includes(item?.vcs?.[0]?.vc_status) ? (<span onClick={()=>RestoreVC(item?.vcs?.[0]?.vc_status)}>Restore VC</span>) : <span><img src={Verified} alt="Verified"/></span>}
                        </div>

                    )
                )}
            </HistoryTable>
            <Pagination
                pages={parseInt(dataTotal / 10)}
                page={page}
                setPage={setPage}
            />
        </div>
    );
};

export default Income;
