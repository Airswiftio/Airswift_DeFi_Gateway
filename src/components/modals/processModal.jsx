import React, { useEffect } from "react";
import "./processModal.scss";

const ProcessModal = ({ click }) => {
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
              <div className="chain chain-top"></div>
              <div className="marker" />
            </div>
            <div className="section">
              <div className="chain chain-top"></div>
              <div className="marker" />
            </div>
            <div className="section">
              <div className="chain chain-top"></div>
              <div className="marker" />
            </div>
            <div className="section">
              <div className="marker" />
            </div>
          </div>
          <div className="labels">
            <div className="label">VP Created</div>
            <div className="label">VP Start</div>
            <div className="label">VP Verified</div>
            <div className="label">Transaction On Chain</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessModal;
