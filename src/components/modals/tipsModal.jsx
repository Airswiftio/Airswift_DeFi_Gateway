import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./tipsModal.scss";

const TipsModal = ({ click }) => {
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
    <div className="tipsModal">
      <div className="modalContent">
        <div className="title">Tips</div>
        <div className="tip">
          You changed the device and need to restore all VC
        </div>
        <DefaultButton
          title="Restore All"
          click={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
};

export default TipsModal;
