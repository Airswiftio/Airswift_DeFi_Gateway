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
            status:'pending',
            // payment_num:0,
            // currency_id:0,
            // date:0,
        }
        const res = await GetPaymentList(params)
        if(res?.code === 1000){
            setDataList(res?.msg?.payments ?? [])
            setDataTotal(res?.msg?.total)
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
                    ({ transId, status, currency, amount, time, viewMore, vc }, index) =>
                        filters?.status ? (
                            status === filters?.status && (
                                <HistoryElement
                                    transId={transId}
                                    status={status}
                                    currency={currency}
                                    amount={amount}
                                    time={time}
                                    viewMore={viewMore}
                                    vc={vc}
                                    key={index}
                                    click={openModal}
                                />
                            )
                        ) : (
                            <HistoryElement
                                transId={transId}
                                status={status}
                                currency={currency}
                                amount={amount}
                                time={time}
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
