import React, { useState } from "react";
import Popup from "reactjs-popup";
import { DefaultButton, WithdrawModal, DepositModal } from "..";

import "./farmCard.scss";

const FarmCard = ({ icon, title }) => {
  const [addModalIsOpen, setIsAddOpen] = useState(false);
  const [removeModalIsOpen, setIsRemoveOpen] = useState(false);

  const openAddModal = () => {
    setIsAddOpen(true);
  };

  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  const openRemoveModal = () => {
    setIsRemoveOpen(true);
  };

  const closeRemoveModal = () => {
    setIsRemoveOpen(false);
  };

  return (
    <div className="farmCardWrapper">
      <Popup open={addModalIsOpen} closeOnDocumentClick onClose={closeAddModal}>
        <DepositModal click={closeAddModal} />
      </Popup>
      <Popup
        open={removeModalIsOpen}
        closeOnDocumentClick
        onClose={closeRemoveModal}
      >
        <WithdrawModal click={closeRemoveModal} />
      </Popup>
      <div className="header">
        <img src={icon} alt={title} />
        <span className="title">{title}</span>
      </div>
      <div className="row">
        <div className="info">APR</div>
        <div className="info">22.199191%</div>
      </div>

      <div className="btn">
        <DefaultButton title="Deposit" type={2} click={openAddModal} />
        <DefaultButton title="Withdraw" type={2} click={openRemoveModal} />
      </div>
      <div className="row">
        <div className="info">TVL</div>
        <div className="info">0.0112</div>
      </div>
      <div className="row">
        <div className="info">Earning</div>
        <div className="info">14/DAY</div>
      </div>
      <div className="row">
        <div className="info">
          Available
          <br />
          Profit Share
        </div>
        <div className="info">14.20214</div>
      </div>
      <div className="btn">
        <DefaultButton title="Harvest" type={2} />
      </div>
    </div>
  );
};

export default FarmCard;
