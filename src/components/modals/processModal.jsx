import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./processModal.scss";

const ProcessModal = ({ click }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("modal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "modal") {
        click();
      }
    });
  }, []);

  const navigate = useNavigate();
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
