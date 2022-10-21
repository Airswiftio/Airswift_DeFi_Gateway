import React, { useState } from "react";
import Popup from "reactjs-popup";

import { HistoryTable, HistoryElement } from "../";

import "./income.scss";
import dummyData from "../../sample_data.json";

const Income = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

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
        <div className="modal" onClick={closeModal}>
          <div className="modalContent">
            <div className="items">
              <div className="label">Status: </div>
              <div className="item green">Finished</div>
              <div className="label">Transaction ID: </div>
              <div className="item">IN2747034</div>
              <div className="label">Original Price: </div>
              <div className="item">400 USD</div>
              <div className="label">Pay Price: </div>
              <div className="item">400.01USDT</div>
              <div className="label">Exchange Rate: </div>
              <div className="item">1.01</div>
              <div className="label">Outcome Price: </div>
              <div className="item">398.29</div>
              <div className="label">Created at: </div>
              <div className="item">24 Mar 2022， 11:38am</div>
              <div className="label">Completed at: </div>
              <div className="item">24 Mar 2022， 11:46am</div>
              <div className="label">Payin address: </div>
              <div className="item">
                0xdd21116e2f4674b4c49253d4b31ba4348ac2c477
              </div>
              <div className="label">Payout address: </div>
              <div className="item">
                0x19ed768da39e69da5039b9853bee0df806d802e2
              </div>
              <div className="label">Payment Hash: </div>
              <div className="item">
                0x036ced3c6d53797f4ce7798acc07ff5fbbb6d6941f88958ca18bdc47bcd1c540
              </div>
            </div>
          </div>
        </div>
      </Popup>
      <HistoryTable>
        {dummyData.incomeHistory.map(
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
              vc={vc}
              key={index}
              click={openModal}
            />
          )
        )}
      </HistoryTable>
    </div>
  );
};

export default Income;
