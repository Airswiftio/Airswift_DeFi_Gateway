import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import {
    DefaultButton,
    ConfirmWithdrawModal,
} from "../";
import "./confirmWithdraw.scss";
import {GetPaymentList} from "@@/utils/request/api";
import {svg_icon} from "@@/utils/config";
import Verified from "@@/assets/verified.svg";
import Alert from "@@/components/PopUp/Alert";
import {conversionUtcDate} from "@@/utils/function";

const ConfirmWithdraw = ({Currency}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertData, setAlertData] = useState({});

    const confirmWithdraw = () => {
        if(checkedList?.length <= 0){
            setOpenAlert(true)
            setAlertData({msg:'Please select vc! '})
            return false;
        }
        let data = [];
        let total = 0;
        checkedList.map((item,index)=>{
            total = total + dataList?.[item]?.amount;
            data = [...data,dataList?.[item]]
            return item;
        })
        setSelectData(data);
        setTotalAmount(total);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const selectAll = () => {
        setIsAll(checkedList?.length === 0 ? true : false);
        setCheckedList(checkedList?.length === 0 ? dataList.map((ee,kk)=>kk) :[]);
    };

    const selectRow = (key) => {
        if (checkedList?.includes(key)) {
            setCheckedList(checkedList.filter((e) => e !== key));
            if(checkedList?.length === dataList?.length){
                setIsAll(false);
            }
        } else {
            setCheckedList([...checkedList, key]);
            setIsAll(checkedList?.length +1 === dataList?.length ? true : false);
        }
    };

    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);

    const getList = async () => {
        let params = {
            // app_id:0,
            page:1,
            size:10,
            status:'success',
            // payment_num:0,
            currency_id:Currency?.id,
            // date:date??'',
        }
        const res = await GetPaymentList(params)
        if(res?.code === 1000){
            setDataList(res?.data?.payments ?? [])
            setDataTotal(res?.data?.total)
        }
    }
    useEffect(() => {
        getList();
        // getWithdrawTotal();
    }, []);

    return (
        <div className="confWithdrawWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <ConfirmWithdrawModal
                    total={totalAmount}
                    data={selectData}
                    currency={Currency}
                    click={closeModal}
                />
            </Popup>
            <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
                <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
            </Popup>
            <div className="title">Select available transactions</div>
            <div className="historyTableWrapper">
                <div className="columnLabels">
                    <span style={{width:'10%'}}><div className="checkBox" onClick={()=>selectAll()}>{isAll && svg_icon('selected')}</div></span>
                    <span>Trans ID</span>
                    <span>Currency</span>
                    <span>Amount(USD)</span>
                    <span>Time</span>
                    <span>VCs</span>
                </div>
                <div className="historyTableContent">
                    {dataList.map(
                        (item, index) => (
                            <div key={index} className="historyElementWrapper" onClick={()=>selectRow(index)}>
                                <span style={{width:'10%'}}><div className="checkBox">{checkedList?.includes(index) ? svg_icon('selected'):null}</div></span>
                                <span>{item?.payment_num}</span>
                                <span>{item?.currency_symbol}</span>
                                <span>{item?.amount}</span>
                                <span>{conversionUtcDate(item?.created_at)}</span>
                                <span><img src={Verified} alt="Verified" /></span>
                            </div>
                        )
                    )}
                </div>
            </div>

            <DefaultButton
                title="Confirm Withdraw"
                align={1}
                click={() => confirmWithdraw()}
            />
            <div className="help">How can I use VP?</div>
        </div>
    );
};

export default ConfirmWithdraw;
