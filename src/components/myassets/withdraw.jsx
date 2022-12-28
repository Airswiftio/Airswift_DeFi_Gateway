import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import {
    HistoryTable,
    HistoryElement,
    DefaultButton,
    Pagination,
    ProcessModal,
} from "../";

import "./withdraw.scss";
import { useNavigate } from "react-router-dom";
import { GetWithdrawList} from "@@/utils/request/api";
import Doc from "@@/assets/document.svg";
import Verified from "@@/assets/verified.svg";
import {select_currency} from "@@/utils/config";
import {conversionUtcDate} from "@@/utils/function";

const Withdraw = ({search,selectStatus,selectCurrency,date}) => {
    const [page, setPage] = useState(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const pageSize = 10;
    const WithdrawStatus = [
        {key:'all',title:'All'},
        {key:'complete',title:'Complete'},
        {key:'pending',title:'Pending'},
    ];

    const ViewMore = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const viewChainTx = (item) => {
        window.open(`https://goerli.etherscan.io/tx/${item.tx_hash}`)
    }

    const getList = async () => {
        console.log(WithdrawStatus?.[selectStatus]?.key??'complete')
        let params = {
            // app_id:0,
            page:page,
            size:pageSize,
            status:WithdrawStatus?.[selectStatus]?.key??'all',
            withdraw_num:search,
            date:date??'',
        }
        if(selectCurrency !== null){
            params.currency_id = select_currency()?.[selectCurrency]?.id
        }
        const res = await GetWithdrawList(params)
        if(res?.code === 1000){
            setDataList(res?.data?.withdraws ?? [])
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
        <div className="withdrawWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <ProcessModal click={closeModal} />
            </Popup>
            <HistoryTable vc={false}>
                {dataList.map(
                    (item, index) => (
                        <div key={index} className="historyElementWrapper">
                            <span>{item?.withdraw_num}</span>
                            <span>{item?.status}</span>
                            <span>{item?.currency_symbol}</span>
                            <span>{item?.amount}</span>
                            <span>{conversionUtcDate(item.created_at)}</span>
                            {item?.status === 'complete'
                                ? (
                                    <div className="onChainStatus" onClick={()=>viewChainTx(item)} >
                                        <div>On Chain Status</div>
                                    </div>
                                )
                                : (<span onClick={ViewMore}><img src={Doc} alt="View more" /></span>)}
                        </div>
                    )
                )}
            </HistoryTable>
            <Pagination
                pages={Math.ceil(dataTotal/ pageSize)}
                page={page}
                setPage={setPage}
            />
            <DefaultButton
                title="Withdraw"
                align={1}
                click={() => navigate("/withdraw")}
            />
            {/*<div className="help">How can I use VP?</div>*/}
        </div>
    );
};

export default Withdraw;
