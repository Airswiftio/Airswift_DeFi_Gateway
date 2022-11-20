import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import useFilters from "../../hooks/useFilters";

import { HistoryTable, HistoryElement, Modal, Pagination } from "../";

import "./income.scss";
import {GetPaymentList} from "@@/utils/request/api";
import Doc from "@@/assets/document.svg";
import Verified from "@@/assets/verified.svg";

const Income = ({search,selectStatus,selectCurrency,date}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [itemData, setItemData] = useState({});
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
            setDataList(res?.data?.payments ?? [])
            setDataTotal(res?.data?.total)
        }
    }

    useEffect(() => {
        getList();
    }, [search,selectStatus,selectCurrency,date]);

    useEffect(() => {
        getList();
        // getWithdrawTotal();
    }, []);

    return (
        <div className="incomeWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <Modal click={closeModal} data={itemData} />
            </Popup>
            <HistoryTable>
                {dataList.map(
                    (item, index) => (
                        <div key={index} className="historyElementWrapper" onClick={()=>openViewMore(item)}>
                            <span>{item.payment_num}</span>
                            <span>{item.status}</span>
                            <span>{item.currency_symbol}</span>
                            <span>{item.amount}</span>
                            <span>{item.created_at}</span>
                            <span><img src={Doc} alt="View more"/></span>
                            {item?.vc_exist === false && ['Created', 'Active'].includes(item?.vc_status) ? (<span>Restore VC</span>) : <span><img src={Verified} alt="Verified"/></span>}
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
