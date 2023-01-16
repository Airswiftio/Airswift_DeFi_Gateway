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
import {conversionUtcDate, copy_text, dbGetUserWallet} from "@@/utils/function";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip as ReactTooltip} from "react-tooltip";

const Withdraw = ({search,selectStatus,selectCurrency,date,searchTransID}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [itemData, setItemData] = useState({});

    const pageSize = 10;
    const WithdrawStatus = [
        {key:'all',title:'All'},
        {key:'complete',title:'Complete'},
        {key:'created',title:'Pending'},
    ];

    const ViewMore = (item) => {
        setIsOpen(true);
        setItemData(item)
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const viewChainTx = (item) => {
        window.open(`${process.env.REACT_APP_EXPLORER_URL}/tx/${item.tx_hash}`)
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
    }, [searchTransID,selectStatus,selectCurrency,date, modalIsOpen]);

    return (
        <div className="withdrawWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <ProcessModal click={closeModal} itemData={itemData} />
            </Popup>
            <HistoryTable vc={false}>
                {dataList.map(
                    (item, index) => (
                        <div key={index} className="historyElementWrapper">
                            <ReactTooltip
                                anchorId={'app-withdraw'+index}
                                place="bottom"
                                content={item.withdraw_num}
                            />
                            <span
                                id={'app-withdraw'+index}
                                className="over_play cursor_pointer"
                                onClick={ () => {
                                    copy_text(item.withdraw_num) === true ? toast.success('Copy succeeded!') : toast.error('Copy failed!')
                                }}
                            >{item?.withdraw_num}</span>
                            <span className="center_text">{item?.status === 'created' ? 'pending':item?.status}</span>
                            <span className="center_text">{item?.currency_symbol}</span>
                            <span className="center_text">{item?.amount}</span>
                            <span className="center_text">{conversionUtcDate(item.created_at)}</span>
                            {item?.status === 'complete'
                                ? (<div className="onChainStatus2 center_text" onClick={()=>viewChainTx(item)} ><img src={Doc} alt="View more" /></div>)
                                : (
                                    <div className="onChainStatus center_text" onClick={()=>ViewMore(item)}>
                                        <div>On Chain Status</div>
                                    </div>
                                )}
                        </div>
                    )
                )}
            </HistoryTable>
            <Pagination
                pages={Math.ceil(dataTotal/ pageSize)}
                page={page}
                setPage={setPage}
            />
            {dbGetUserWallet()?.roles === "admin" &&
                <DefaultButton
                    title="Withdraw"
                    align={1}
                    click={() => navigate("/withdraw")}
                />
            }

            {/*<div className="help">How can I use VP?</div>*/}
        </div>
    );
};

export default Withdraw;
