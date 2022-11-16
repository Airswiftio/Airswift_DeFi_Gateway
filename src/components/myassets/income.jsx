import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import useFilters from "../../hooks/useFilters";

import { HistoryTable, HistoryElement, Modal, Pagination } from "../";

import "./income.scss";
import {GetPaymentList} from "@@/utils/request/api";

const Income = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const { filters } = useFilters();

    const openModal = () => {
        setIsOpen(true);
        console.log("Clicked");
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getList = async () => {
        let params = {
            // app_id:0,
            page:1,
            size:10,
            status:'success',
            // payment_num:0,
            // currency_id:0,
            // date:0,
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
        <div className="incomeWrapper">
            <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
                <Modal click={closeModal} />
            </Popup>
            <HistoryTable>
                {dataList.map(
                    ({ payment_num, status, currency_symbol, amount, created_at, viewMore, vc }, index) =>
                        filters?.status ? (
                            status === filters?.status && (
                                <HistoryElement
                                    transId={payment_num}
                                    status={status}
                                    currency={currency_symbol}
                                    amount={amount}
                                    time={created_at}
                                    viewMore={viewMore}
                                    vc={vc}
                                    key={index}
                                    click={openModal}
                                />
                            )
                        ) : (
                            <HistoryElement
                                transId={payment_num}
                                status={status}
                                currency={currency_symbol}
                                amount={amount}
                                time={created_at}
                                viewMore={viewMore}
                                vc={vc}
                                key={index}
                                click={openModal}
                            />
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
