import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import useFilters from "../../hooks/useFilters";

import { HistoryTable, HistoryElement, Modal, Pagination } from "../";

import "./income.scss";
import dummyData from "../../sample_data.json";

const Income = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { filters } = useFilters();

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="incomeWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <Modal click={closeModal} />
      </Popup>
      <HistoryTable>
        {dummyData.incomeHistory.map(
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
        pages={parseInt(dummyData.incomeHistory.length / 4)}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Income;
