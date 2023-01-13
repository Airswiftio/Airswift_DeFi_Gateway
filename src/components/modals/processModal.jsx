import React, { useEffect } from "react";
import "./processModal.scss";

const ProcessModal = ({ click, itemData }) => {
  const viewChainTx = (item) => {
    window.open(`${process.env.REACT_APP_EXPLORER_URL}/tx/${item.tx_hash}`)
  }
  useEffect(() => {
    const modal = document.getElementsByClassName("processModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "processModal") {
        click();
      }
    });
  }, []);

  return (
    <div className="processModal">
      <div className="modalContent">
        <div className="title">View Process</div>
        <div className="process">
          <div className="path">
            <div className="section">
              <div className="chain chain-top chain_done"></div>
              <div className="marker marker_done" />
            </div>
            <div className="section">
              <div className="chain chain-top chain_done"></div>
              <div className="marker marker_done" />
            </div>
            <div className="section">
              <div className="chain chain-top chain_done"></div>
              <div className="marker marker_done" />
            </div>
            <div className="section cursor" >
              <div className="marker marker_doing" />
            </div>
          </div>
          <div className="labels">
            <div className="label">VP Created</div>
            <div className="label">VP Start</div>
            <div className="label">VP Verified</div>
            {itemData?.tx_hash ? 
              <div className="label cursor" onClick={() => viewChainTx(itemData)}>Transaction On Chain</div> :
              <div className="label">Transaction On Chain</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessModal;
