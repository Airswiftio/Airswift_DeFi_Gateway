import React, { useState } from "react";
import Popup from "reactjs-popup";
import { DefaultButton, AddLiquidityModal, RemoveLiquidityModal } from "..";
import "./poolCard.scss";

const PoolCard = ({ icon, title }) => {
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
    <div className="poolCardWrapper">
      <Popup open={addModalIsOpen} closeOnDocumentClick onClose={closeAddModal}>
        <AddLiquidityModal click={closeAddModal} />
      </Popup>
      <Popup
        open={removeModalIsOpen}
        closeOnDocumentClick
        onClose={closeRemoveModal}
      >
        <RemoveLiquidityModal click={closeRemoveModal} />
      </Popup>
      <div className="header">
        <img src={icon} alt={title} />
        <span className="title">{title}</span>
      </div>
      <div className="row">
        <div className="info">Your Position</div>
        <div className="info">122</div>
      </div>
      <div className="row">
        <div className="info">Pool Share</div>
        <div className="info">13441%</div>
      </div>

      <div className="btn">
        <DefaultButton title="Add Liquidity" type={1} click={openAddModal} />
      </div>
      <div className="row">
        <div className="info">Total Supply</div>
        <div className="info">0.0112</div>
      </div>
      <div className="row">
        <div className="info">APR</div>
        <div className="info">01.221</div>
      </div>

      <div className="btn">
        <DefaultButton
          title="Remove Liquidity"
          type={1}
          click={openRemoveModal}
        />
      </div>
    </div>
  );
};

export default PoolCard;
