import React, { useState } from "react";
import Popup from "reactjs-popup";
import {
  HistoryTable,
  HistoryElement,
  DefaultButton,
  Pagination,
  ProcessModal,
} from "../";

import "./withdraw.scss";
import dummyData from "../../sample_data.json";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const [page, setPage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="withdrawWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ProcessModal click={closeModal} />
      </Popup>
      <HistoryTable vc={false}>
        {dummyData.withdrawHistory.map(
          (
            { transId, status, currency, amount, time, viewMore, vc },
            index
          ) => (
            <HistoryElement
              transId={transId}
              status={status}
              currency={currency}
              amount={amount}
              time={time}
              viewMore={viewMore}
              key={index}
              click={openModal}
            />
          )
        )}
      </HistoryTable>
      <Pagination
        pages={parseInt(dummyData.withdrawHistory.length / 2)}
        page={page}
        setPage={setPage}
      />
      <DefaultButton
        title="Withdraw"
        align={1}
        click={() => navigate("/withdraw")}
      />
      <div className="help">How can I use VP?</div>
    </div>
  );
};

export default Withdraw;
